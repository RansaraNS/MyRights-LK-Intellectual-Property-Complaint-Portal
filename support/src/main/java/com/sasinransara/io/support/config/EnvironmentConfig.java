package com.sasinransara.io.support.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;

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

    // Notify.lk Configuration
    @Value("${notify.user.id}")
    private String notifyUserId;

    @Value("${notify.api.key}")
    private String notifyApiKey;

    @Value("${notify.sender.id}")
    private String notifySenderId;

    // Server Configuration
    @Value("${server.port}")
    private int serverPort;

    // RestTemplate Bean for HTTP requests
    @Bean(name = "customRestTemplate")
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

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

    public String getNotifyUserId() {
        return notifyUserId;
    }

    public String getNotifyApiKey() {
        return notifyApiKey;
    }

    public String getNotifySenderId() {
        return notifySenderId;
    }

    public int getServerPort() {
        return serverPort;
    }
}