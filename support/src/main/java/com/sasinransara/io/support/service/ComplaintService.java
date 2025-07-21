package com.sasinransara.io.support.service;

import com.sasinransara.io.support.entity.Complaint;
import com.sasinransara.io.support.repository.ComplaintRepository;
import com.sasinransara.io.support.util.PhoneVerificationStore;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.locks.ReentrantLock;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final NotifyLkService notifyLkService;
    private final ReentrantLock complaintNumberLock = new ReentrantLock();
    private final PhoneVerificationStore phoneVerificationStore;

    @Transactional
    public Complaint createComplaint(Complaint complaint) {
        // Generate complaint number
        complaint.setComplaintNumber(generateComplaintNumber());
        
        // Set creation timestamp
        complaint.setCreatedAt(LocalDateTime.now());
        
        // Save the complaint
        return complaintRepository.save(complaint);
    }

    private String generateComplaintNumber() {
        complaintNumberLock.lock();
        try {
            // Get current date in YYMMDD format
            String dateFormat = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
            
            // Find the latest complaint number in DB (regardless of date)
            String lastComplaintNumber = complaintRepository.findLastComplaintNumber();
            
            int nextSequence = 1000; // Default starting number
            
            if (lastComplaintNumber != null) {
                // Extract the sequence number from the last complaint number
                // Format: FBxxxx/yymmdd
                String sequencePart = lastComplaintNumber.substring(2, 6);
                int lastSequence = Integer.parseInt(sequencePart);
                nextSequence = lastSequence + 1;
            }
            
            return String.format("FB%04d/%s", nextSequence, dateFormat);
        } finally {
            complaintNumberLock.unlock();
        }
    }

    public String sendOTP(String phoneNumber) {
        try {
            // Format phone number for Sri Lankan numbers
            String formattedPhone = formatPhoneNumber(phoneNumber);
            
            // Send OTP using Notify.lk service
            return notifyLkService.sendOTP(formattedPhone);
        } catch (Exception e) {
            log.error("Error sending OTP to phone number {}: {}", phoneNumber, e.getMessage());
            throw new RuntimeException("Failed to send OTP: " + e.getMessage());
        }
    }

    public boolean verifyOTP(String phoneNumber, String otpCode) {
        try {
            String formattedPhone = formatPhoneNumber(phoneNumber);
            boolean isValid = notifyLkService.verifyOTP(formattedPhone, otpCode);
            if (isValid) {
                phoneVerificationStore.markVerified(formattedPhone); // NEW LINE
            }
            return isValid;
        } catch (Exception e) {
            log.error("Error verifying OTP for phone number {}: {}", phoneNumber, e.getMessage());
            return false;
        }
    }

    public boolean isPhoneVerified(String phoneNumber) {
        String formattedPhone = formatPhoneNumber(phoneNumber);
        return phoneVerificationStore.isVerified(formattedPhone);
    }


    @Transactional
    public void markPhoneAsVerified(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        
        complaint.setPhoneVerified(true);
        complaint.setPhoneVerifiedAt(LocalDateTime.now());
        complaintRepository.save(complaint);
    }

    private String formatPhoneNumber(String phoneNumber) {
        // Remove any spaces, dashes, parentheses, and plus signs
        String cleaned = phoneNumber.replaceAll("[\\s\\-\\(\\)\\+]", "");
        
        // Format for Sri Lankan numbers - Notify.lk expects 11 digits: 94XXXXXXXXX
        if (cleaned.startsWith("0")) {
            // Remove leading 0 and add 94 (e.g., 0714941092 -> 94714941092)
            cleaned = "94" + cleaned.substring(1);
        } else if (cleaned.startsWith("94") && cleaned.length() == 11) {
            // Already in correct format (94XXXXXXXXX)
            return cleaned;
        } else if (cleaned.length() == 9) {
            // Assuming it's a Sri Lankan number without country code
            cleaned = "94" + cleaned;
        }
        
        // Validate the final format
        if (cleaned.length() != 11 || !cleaned.startsWith("94")) {
            throw new IllegalArgumentException("Invalid Sri Lankan phone number format. Expected 11 digits starting with 94.");
        }
        
        return cleaned;
    }

    public Complaint getComplaintByNumber(String complaintNumber) {
        return complaintRepository.findByComplaintNumber(complaintNumber)
                .orElseThrow(() -> new RuntimeException("Complaint not found with number: " + complaintNumber));
    }

    public Complaint getComplaintById(Long complaintId) {
        return complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));
    }

    @Transactional
    public Complaint updateComplaint(Complaint complaint) {
        try {
            log.info("Updating complaint: {}", complaint.getId());
            if (complaint.getId() == null || !complaintRepository.existsById(complaint.getId())) {
                throw new RuntimeException("Complaint not found or invalid ID");
            }
            return complaintRepository.save(complaint);
        } catch (Exception e) {
            log.error("Failed to update complaint: {}", e.getMessage());
            throw e;
        }
    }

    @Transactional
    public void updatePaymentStatus(String complaintNumber, String paymentStatus, String paymentId, Double paymentAmount) {
        Complaint complaint = getComplaintByNumber(complaintNumber);
        complaint.setPaymentStatus(paymentStatus);
        complaint.setPaymentId(paymentId);
        complaint.setPaymentAmount(paymentAmount);
        complaint.setPaymentDate(LocalDateTime.now());
        complaintRepository.save(complaint);
    }
}