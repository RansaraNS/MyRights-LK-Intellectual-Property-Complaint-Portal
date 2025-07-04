package com.sasinransara.io.support.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class NotifyLkService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    // Store OTP codes temporarily (phone -> OTP data)
    private final Map<String, OTPData> otpStorage = new ConcurrentHashMap<>();

    @Value("${notify.user.id}")
    private String userId;

    @Value("${notify.api.key}")
    private String apiKey;

    @Value("${notify.sender.id}")
    private String senderId;

    private static final String NOTIFY_BASE_URL = "https://app.notify.lk/api/v1";
    private static final int OTP_EXPIRY_MINUTES = 5; // OTP expires in 5 minutes

    public NotifyLkService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Send OTP to the specified phone number
     * @param phoneNumber formatted phone number (94xxxxxxxxx)
     * @return status message from Notify.lk
     */
    public String sendOTP(String phoneNumber) {
        try {
            // Generate 6-digit OTP
            String otpCode = generateOTP();
            
            // Store OTP with expiry time
            otpStorage.put(phoneNumber, new OTPData(otpCode, LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES)));
            
            String url = NOTIFY_BASE_URL + "/send";
            
            // Create message with actual OTP code
            String message = String.format("Your verification code is: %s. Do not share this code with anyone. Valid for %d minutes.", 
                                         otpCode, OTP_EXPIRY_MINUTES);
            
            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("user_id", userId);
            requestBody.put("api_key", apiKey);
            requestBody.put("sender_id", senderId);
            requestBody.put("to", phoneNumber);
            requestBody.put("message", message);
            
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            log.info("Sending OTP to phone number: {} with code: {}", phoneNumber, otpCode);
            
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonResponse = objectMapper.readTree(response.getBody());
                String status = jsonResponse.get("status").asText();
                
                log.info("OTP sent successfully. Status: {}", status);
                return status;
            } else {
                log.error("Failed to send OTP. Status: {}", response.getStatusCode());
                throw new RuntimeException("Failed to send OTP");
            }
            
        } catch (Exception e) {
            log.error("Error sending OTP: {}", e.getMessage());
            throw new RuntimeException("Failed to send OTP: " + e.getMessage());
        }
    }

    /**
     * Verify OTP code for the specified phone number
     * @param phoneNumber formatted phone number (94xxxxxxxxx)
     * @param otpCode OTP code entered by user
     * @return true if OTP is valid, false otherwise
     */
    public boolean verifyOTP(String phoneNumber, String otpCode) {
        try {
            log.info("Verifying OTP for phone number: {}", phoneNumber);
            
            // Get stored OTP data
            OTPData storedOTP = otpStorage.get(phoneNumber);
            
            if (storedOTP == null) {
                log.warn("No OTP found for phone number: {}", phoneNumber);
                return false;
            }
            
            // Check if OTP is expired
            if (LocalDateTime.now().isAfter(storedOTP.getExpiryTime())) {
                log.warn("OTP expired for phone number: {}", phoneNumber);
                otpStorage.remove(phoneNumber); // Clean up expired OTP
                return false;
            }
            
            // Verify OTP code
            boolean isValid = storedOTP.getCode().equals(otpCode);
            
            if (isValid) {
                // Remove OTP after successful verification
                otpStorage.remove(phoneNumber);
                log.info("OTP verification successful for phone number: {}", phoneNumber);
            } else {
                log.warn("Invalid OTP code for phone number: {}", phoneNumber);
            }
            
            return isValid;
            
        } catch (Exception e) {
            log.error("Error verifying OTP: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Generate a 6-digit OTP code
     * @return 6-digit OTP as string
     */
    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates 6-digit number
        return String.valueOf(otp);
    }
    
    /**
     * Clean up expired OTPs (should be called periodically)
     */
    public void cleanupExpiredOTPs() {
        LocalDateTime now = LocalDateTime.now();
        otpStorage.entrySet().removeIf(entry -> now.isAfter(entry.getValue().getExpiryTime()));
    }
    
    /**
     * Inner class to store OTP data with expiry time
     */
    private static class OTPData {
        private final String code;
        private final LocalDateTime expiryTime;
        
        public OTPData(String code, LocalDateTime expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }
        
        public String getCode() {
            return code;
        }
        
        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }
    }
}