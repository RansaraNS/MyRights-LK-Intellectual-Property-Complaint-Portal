package com.sasinransara.io.support.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.sasinransara.io.support.config.PayHereConfig;
import com.sasinransara.io.support.entity.Complaint;
import com.sasinransara.io.support.repository.ComplaintRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PayHereConfig payHereConfig;
    private final ComplaintRepository complaintRepository;

    public Map<String, String> preparePaymentRequest(Long complaintId, String notifyUrl, String returnUrl, String cancelUrl) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        Map<String, String> paymentParams = new HashMap<>();
        
        // Split full name into first and last names
        String[] nameParts = complaint.getFullName().split(" ", 2);
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        // Required parameters
        paymentParams.put("merchant_id", payHereConfig.getMerchantId());
        paymentParams.put("return_url", returnUrl);
        paymentParams.put("cancel_url", cancelUrl);
        paymentParams.put("notify_url", notifyUrl);
        paymentParams.put("first_name", firstName);
        paymentParams.put("last_name", lastName);
        paymentParams.put("email", complaint.getEmail());
        paymentParams.put("phone", complaint.getPhoneNumber());
        paymentParams.put("address", complaint.getAddress());
        paymentParams.put("city", "Colombo");
        paymentParams.put("country", "Sri Lanka");
        paymentParams.put("order_id", complaint.getComplaintNumber());
        paymentParams.put("items", "Complaint Fee - " + complaint.getComplaintNumber());
        paymentParams.put("currency", payHereConfig.getCurrency());
        paymentParams.put("amount", String.valueOf(payHereConfig.getComplaintFee()));
        
        // Generate hash
        String hash = generateHash(
                payHereConfig.getMerchantId(),
                complaint.getComplaintNumber(),
                String.valueOf(payHereConfig.getComplaintFee()),
                payHereConfig.getCurrency(),
                payHereConfig.getMerchantSecret()
        );
        paymentParams.put("hash", hash);

        return paymentParams;
    }

    private String generateHash(String merchantId, String orderId, String amount, String currency, String merchantSecret) {
        try {
            // First hash the merchant secret
            String hashedSecret = md5(merchantSecret).toUpperCase();
            
            // Format amount with 2 decimal places
            String formattedAmount = String.format("%.2f", Double.parseDouble(amount));
            
            // Then create the main hash
            String hashInput = merchantId + orderId + formattedAmount + currency + hashedSecret;
            return md5(hashInput).toUpperCase();
        } catch (Exception e) {
            log.error("Error generating payment hash", e);
            throw new RuntimeException("Failed to generate payment hash");
        }
    }

    private String md5(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public boolean verifyPayment(Map<String, String> paymentResponse) {
        try {
            String receivedHash = paymentResponse.get("md5sig");
            String merchantId = paymentResponse.get("merchant_id");
            String orderId = paymentResponse.get("order_id");
            String amount = paymentResponse.get("payhere_amount");
            String currency = paymentResponse.get("payhere_currency");
            String statusCode = paymentResponse.get("status_code");

            // Verify status is 2 (success)
            if (!"2".equals(statusCode)) {
                return false;
            }

            // Re-generate hash to verify using PayHere's notification format
            String hashInput = merchantId + 
                            orderId + 
                            amount + 
                            currency + 
                            statusCode + 
                            md5(payHereConfig.getMerchantSecret()).toUpperCase();
            
            String expectedHash = md5(hashInput).toUpperCase();
            return expectedHash.equalsIgnoreCase(receivedHash);
        } catch (Exception e) {
            log.error("Error verifying payment", e);
            return false;
        }
    }
}
