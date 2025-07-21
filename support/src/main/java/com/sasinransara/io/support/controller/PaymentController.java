package com.sasinransara.io.support.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sasinransara.io.support.entity.Complaint;
import com.sasinransara.io.support.service.ComplaintService;
import com.sasinransara.io.support.service.EmailService;
import com.sasinransara.io.support.service.PaymentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;
    private final ComplaintService complaintService;
    private final EmailService emailService;

    @PostMapping("/notify")
    public ResponseEntity<String> handlePaymentNotification(@RequestParam Map<String, String> paymentResponse) {
        try {
            log.info("Received payment notification: {}", paymentResponse);
            
            boolean isValid = paymentService.verifyPayment(paymentResponse);
            if (!isValid) {
                log.warn("Invalid payment notification received");
                return ResponseEntity.badRequest().body("Invalid payment");
            }

            String statusCode = paymentResponse.get("status_code");
            String complaintNumber = paymentResponse.get("order_id");
            String paymentId = paymentResponse.get("payment_id");
            String amount = paymentResponse.get("payhere_amount");

            if(!"2".equals(statusCode)) {
                log.warn("Payment not successful. Status: {}", statusCode);
                return ResponseEntity.badRequest().body("Payment not successful");
            }

            // Update complaint payment status
            Complaint complaint = complaintService.getComplaintByNumber(complaintNumber);
            complaint.setPaymentStatus("PAID");
            complaint.setPaymentId(paymentId);
            complaint.setPaymentAmount(Double.parseDouble(amount));
            complaint.setPaymentDate(LocalDateTime.now());
            complaintService.updateComplaint(complaint);

            log.info("Successfully updated payment status for complaint: {}", complaintNumber);

            // Send confirmation email
            emailService.sendComplaintConfirmation(complaint.getEmail(), complaint.getComplaintNumber());

            return ResponseEntity.ok("Payment processed successfully");
        } catch (Exception e) {
            log.error("Error processing payment notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing payment: " + e.getMessage());
        }
    }

    @GetMapping("/status/{complaintId}")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@PathVariable Long complaintId) {
        try {
            Complaint complaint = complaintService.getComplaintById(complaintId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("paymentStatus", complaint.getPaymentStatus());
            response.put("paymentId", complaint.getPaymentId());
            response.put("paymentAmount", complaint.getPaymentAmount());
            response.put("paymentDate", complaint.getPaymentDate());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
