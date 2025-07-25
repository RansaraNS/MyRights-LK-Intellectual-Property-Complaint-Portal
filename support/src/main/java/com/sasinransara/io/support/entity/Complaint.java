package com.sasinransara.io.support.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "complaint_number", nullable = false, unique = true)
    private String complaintNumber;

    @NotBlank(message = "Full Name is required")
    @Size(max = 100, message = "Full Name must be less than 100 characters")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email must be less than 100 characters")
    @Column(name = "email", nullable = false)
    private String email;

    @NotBlank(message = "Phone Number is required")
    @Size(min = 10, max = 13, message = "Phone Number must be between 10 and 13 characters")
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "phone_verified", nullable = false)
    private Boolean phoneVerified = false;

    @Column(name = "phone_verified_at")
    private LocalDateTime phoneVerifiedAt;

    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address must be less than 500 characters")
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull(message = "Original Work Type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "original_work_type", nullable = false)
    private OriginalWorkType originalWorkTypes;

    @NotBlank(message = "Original Work URL is required")
    @Column(name = "original_work_url", nullable = false)
    private String originalWorkUrl;

    @NotNull(message = "Copyright Work Type is required")
    @ElementCollection(targetClass = CopyrightWorkType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
    name = "copyright_work_types",
    joinColumns = @JoinColumn(name = "complaint_id")
    )
    @Column(name = "copyright_work_type", nullable = false)
    private Set<CopyrightWorkType> copyrightWorkTypes = new HashSet<>();

    @NotBlank(message = "Copyright Work URL is required")
    @Column(name = "copyright_work_url", nullable = false)
    private String copyrightWorkUrl;

    @NotNull(message = "Report Reason is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "report_reason", nullable = false)
    private ReportReason reportReason;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    @Column(name = "description")
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Column(nullable = false)
    private String status = "Pending";

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus = "PENDING"; // Default value

    @Column(name = "payment_id")
    private String paymentId;

    @Column(name = "payment_amount")
    private Double paymentAmount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;
}