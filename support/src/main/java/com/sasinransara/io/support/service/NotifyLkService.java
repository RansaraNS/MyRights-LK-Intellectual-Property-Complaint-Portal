package com.sasinransara.io.support.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class NotifyLkService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${notify.user.id}")
    private String userId;

    @Value("${notify.api.key}")
    private String apiKey;

    @Value("${notify.sender.id}")
    private String senderId;

    private static final String NOTIFY_BASE_URL = "https://app.notify.lk/api/v1";

    public NotifyLkService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Send OTP to the specified phone number
     * @param phoneNumber formatted phone number (+94xxxxxxxxx)
     * @return status message from Notify.lk
     */
    public String sendOTP(String phoneNumber) {
        try {
            String url = NOTIFY_BASE_URL + "/send";
            
            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("user_id", userId);
            requestBody.put("api_key", apiKey);
            requestBody.put("sender_id", senderId);
            requestBody.put("to", phoneNumber);
            requestBody.put("message", "Your verification code is: #CODE#. Do not share this code with anyone.");
            
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            log.info("Sending OTP to phone number: {}", phoneNumber);
            
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
     * @param phoneNumber formatted phone number (+94xxxxxxxxx)
     * @param otpCode OTP code entered by user
     * @return true if OTP is valid, false otherwise
     */
    public boolean verifyOTP(String phoneNumber, String otpCode) {
        try {
            String url = NOTIFY_BASE_URL + "/verify";
            
            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("user_id", userId);
            requestBody.put("api_key", apiKey);
            requestBody.put("phone_number", phoneNumber);
            requestBody.put("code", otpCode);
            
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            log.info("Verifying OTP for phone number: {}", phoneNumber);
            
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonResponse = objectMapper.readTree(response.getBody());
                String status = jsonResponse.get("status").asText();
                
                boolean isValid = "success".equalsIgnoreCase(status);
                log.info("OTP verification result: {}", isValid ? "SUCCESS" : "FAILED");
                
                return isValid;
            } else {
                log.error("Failed to verify OTP. Status: {}", response.getStatusCode());
                return false;
            }
            
        } catch (Exception e) {
            log.error("Error verifying OTP: {}", e.getMessage());
            return false;
        }
    }
}