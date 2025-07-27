package com.sasinransara.io.support.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @Autowired
    private EmailService emailService;

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

            log.info("Payment notification received for complaint: {}, Status: {}", complaintNumber, statusCode);
            
            // Just log the notification, don't update DB here
            return ResponseEntity.ok("Payment notification received");
            
        } catch (Exception e) {
            log.error("Error processing payment notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing payment: " + e.getMessage());
        }
    }

    @PostMapping("/update-status")
    public ResponseEntity<Map<String, Object>> updatePaymentStatus(
            @RequestBody Map<String, String> request) {
        try {
            String complaintNumber = request.get("complaintNumber");
            String paymentStatus = request.get("paymentStatus");
            String amount = request.get("amount");

            log.info("Updating payment status for complaint: {}", complaintNumber);
            
            // Update payment details
            complaintService.updatePaymentDetails(
                complaintNumber,
                paymentStatus,
                Double.parseDouble(amount),
                LocalDateTime.now()
            );

            Complaint complaint = complaintService.getComplaintByNumber(complaintNumber);
            if (complaint == null) {
                throw new RuntimeException("Complaint not found with number: " + complaintNumber);
            }
            
            // Send confirmation email
            emailService.sendComplaintConfirmation(complaint.getEmail(), complaint.getComplaintNumber());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Payment status updated successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error updating payment status", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to update payment status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/status/{complaintId}")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@PathVariable Long complaintId) {
        try {
            Complaint complaint = complaintService.getComplaintById(complaintId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("paymentStatus", complaint.getPaymentStatus());
            response.put("complaintNumber", complaint.getComplaintNumber());
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
