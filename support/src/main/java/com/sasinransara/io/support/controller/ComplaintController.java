package com.sasinransara.io.support.controller;

import com.sasinransara.io.support.dto.ComplaintRequest;
import com.sasinransara.io.support.dto.OTPRequest;
import com.sasinransara.io.support.dto.OTPVerificationRequest;
import com.sasinransara.io.support.entity.Complaint;
import com.sasinransara.io.support.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@Slf4j
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOTP(@Valid @RequestBody OTPRequest request) {
        try {
            String status = complaintService.sendOTP(request.getPhoneNumber());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP sent successfully");
            response.put("status", status);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to send OTP: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOTP(@Valid @RequestBody OTPVerificationRequest request) {
        try {
            boolean isValid = complaintService.verifyOTP(request.getPhoneNumber(), request.getOtpCode());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", isValid);
            response.put("message", isValid ? "OTP verified successfully" : "Invalid OTP");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "OTP verification failed: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitComplaint(
            @Valid @RequestBody ComplaintRequest request) {
        try {
            // Verify OTP before submitting complaint
            if (!complaintService.isPhoneVerified(request.getPhoneNumber())) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Phone number not verified. Please verify your phone number before submitting.");
                return ResponseEntity.badRequest().body(response);
            }


            // Create complaint from request
            Complaint complaint = new Complaint();
            complaint.setFullName(request.getFullName());
            complaint.setEmail(request.getEmail());
            complaint.setPhoneNumber(request.getPhoneNumber());
            complaint.setAddress(request.getAddress());
            complaint.setOriginalWorkTypes(request.getOriginalWorkTypes());
            complaint.setOriginalWorkUrl(request.getOriginalWorkUrl());
            complaint.setCopyrightWorkTypes(request.getCopyrightWorkTypes());
            complaint.setCopyrightWorkUrl(request.getCopyrightWorkUrl());
            complaint.setReportReason(request.getReportReason());
            complaint.setDescription(request.getDescription());
            complaint.setPhoneVerified(true);
            complaint.setPhoneVerifiedAt(java.time.LocalDateTime.now());

            // Save complaint
            Complaint savedComplaint = complaintService.createComplaint(complaint);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Complaint submitted successfully");
            response.put("complaintNumber", savedComplaint.getComplaintNumber());
            response.put("complaintId", savedComplaint.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error submitting complaint: ", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to submit complaint: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}