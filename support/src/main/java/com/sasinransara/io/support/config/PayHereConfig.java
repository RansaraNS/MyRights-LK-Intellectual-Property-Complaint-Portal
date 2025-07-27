package com.sasinransara.io.support.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "payhere")
@Data
public class PayHereConfig {

    private String merchantId;
    private String merchantSecret;
    private String currency = "LKR";
    private double complaintFee = 2500.00;
    private boolean sandbox = true; // Add this field
}
