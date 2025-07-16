package com.sasinransara.io.support.dto;

import lombok.Data;

@Data
public class ComplaintResponse {
    private String complaintNumber;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String status;
}
