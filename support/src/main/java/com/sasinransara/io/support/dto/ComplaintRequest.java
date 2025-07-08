package com.sasinransara.io.support.dto;

import com.sasinransara.io.support.entity.CopyrightWorkType;
import com.sasinransara.io.support.entity.OriginalWorkType;
import com.sasinransara.io.support.entity.ReportReason;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintRequest {
    
    @NotBlank(message = "Full Name is required")
    @Size(max = 100, message = "Full Name must be less than 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;

    @NotBlank(message = "Phone Number is required")
    @Size(min = 10, max = 13, message = "Phone Number must be between 10 and 13 characters")
    private String phoneNumber;

    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address must be less than 500 characters")
    private String address;

    @NotNull(message = "Original Work Type is required")
    private OriginalWorkType originalWorkTypes;

    @NotBlank(message = "Original Work URL is required")
    private String originalWorkUrl;

    @NotNull(message = "Copyright Work Types are required")
    private Set<CopyrightWorkType> copyrightWorkTypes;

    @NotBlank(message = "Copyright Work URL is required")
    private String copyrightWorkUrl;

    @NotNull(message = "Report Reason is required")
    private ReportReason reportReason;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;
    
}