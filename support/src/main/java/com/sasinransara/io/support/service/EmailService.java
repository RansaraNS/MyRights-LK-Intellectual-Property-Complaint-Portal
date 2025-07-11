package com.sasinransara.io.support.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendComplaintConfirmation(String toEmail, String complaintNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Complaint Confirmation - MyRights LK");
        String emailContent = "Thank you for submitting your complaint.\n\n"
                        + "Your Complaint Number is: " + complaintNumber + "\n"
                        + "You can use this number to track your complaint status.\n\n"
                        + "We will get back to you shortly.\n\n"
                        + "Best regards,\n"
                        + "MyRights LK Support Team";

        message.setText(emailContent);
        mailSender.send(message);
    }
}