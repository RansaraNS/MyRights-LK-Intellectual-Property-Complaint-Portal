package com.sasinransara.io.support.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Stores verified phone numbers temporarily (valid for 10 minutes)
 */
@Component
public class PhoneVerificationStore {

    private static final int VERIFICATION_EXPIRY_MINUTES = 5;

    private final Map<String, LocalDateTime> verifiedPhones = new ConcurrentHashMap<>();

    public void markVerified(String phoneNumber) {
        verifiedPhones.put(phoneNumber, LocalDateTime.now().plusMinutes(VERIFICATION_EXPIRY_MINUTES));
    }

    public boolean isVerified(String phoneNumber) {
        LocalDateTime expiry = verifiedPhones.get(phoneNumber);
        return expiry != null && LocalDateTime.now().isBefore(expiry);
    }

    public void cleanupExpired() {
        LocalDateTime now = LocalDateTime.now();
        verifiedPhones.entrySet().removeIf(e -> now.isAfter(e.getValue()));
    }
}
