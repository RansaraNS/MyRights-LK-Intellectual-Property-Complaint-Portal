// package com.sasinransara.io.support.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailService {

//     @Autowired
//     private JavaMailSender mailSender;

//     public void sendComplaintConfirmation(String toEmail, String complaintNumber) {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(toEmail);
//         message.setSubject("Complaint Confirmation - MyRights LK");
//         String emailContent = "Thank you for submitting your complaint.\n\n"
//                         + "Your Complaint Number is: " + complaintNumber + "\n"
//                         + "You can use this number to track your complaint status.\n\n"
//                         + "We will get back to you shortly.\n\n"
//                         + "Best regards,\n"
//                         + "MyRights LK Support Team";

//         message.setText(emailContent);
//         mailSender.send(message);
//     }
// }

package com.sasinransara.io.support.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private TemplateEngine templateEngine;
    
    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;
    
    @Value("${app.name:MyRights LK}")
    private String appName;
    
    public void sendComplaintConfirmation(String toEmail, String complaintNumber) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            
            helper.setTo(toEmail);
            helper.setSubject("Complaint Submitted Successfully - " + appName);
            
            // Prepare template variables
            Context context = new Context();
            context.setVariable("complaintNumber", complaintNumber);
            context.setVariable("trackingUrl", baseUrl + "/track-complaint");
            context.setVariable("appName", appName);
            context.setVariable("supportEmail", "support@myrights.lk");
            context.setVariable("year", java.time.Year.now().getValue());
            
            // Process the template
            String htmlContent = templateEngine.process("complaint-confirmation", context);
            helper.setText(htmlContent, true);
            
            mailSender.send(mimeMessage);
            
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}