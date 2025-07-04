package com.sasinransara.io.support.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "classpath:application.properties")
public class EnvironmentConfig {

    // Database Configuration
    @Value("${spring.datasource.url}")
    private String dbUrl;
    
    @Value("${spring.datasource.username}")
    private String dbUsername;
    
    @Value("${spring.datasource.password}")
    private String dbPassword;

    // Twilio Configuration
    @Value("${twilio.account.sid}")
    private String twilioAccountSid;
    
    @Value("${twilio.auth.token}")
    private String twilioAuthToken;
    
    @Value("${twilio.verify.service.sid}")
    private String twilioVerifyServiceSid;

    // Server Configuration
    @Value("${server.port}")
    private int serverPort;

    // Getters
    public String getDbUrl() {
        return dbUrl;
    }

    public String getDbUsername() {
        return dbUsername;
    }

    public String getDbPassword() {
        return dbPassword;
    }

    public String getTwilioAccountSid() {
        return twilioAccountSid;
    }

    public String getTwilioAuthToken() {
        return twilioAuthToken;
    }

    public String getTwilioVerifyServiceSid() {
        return twilioVerifyServiceSid;
    }

    public int getServerPort() {
        return serverPort;
    }
}