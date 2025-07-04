package com.sasinransara.io.support.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class NotifyLkResponse {
    
    @JsonProperty("status")
    private String status;
    
    @JsonProperty("message")
    private String message;
    
    @JsonProperty("data")
    private NotifyLkData data;
    
    public boolean isSuccess() {
        return "success".equalsIgnoreCase(status);
    }
    
    @Data
    public static class NotifyLkData {
        @JsonProperty("message_id")
        private String messageId;
        
        @JsonProperty("recipient")
        private String recipient;
        
        @JsonProperty("message")
        private String message;
        
        @JsonProperty("sent_at")
        private String sentAt;
    }
}