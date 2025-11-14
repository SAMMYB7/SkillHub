package com.skillhub.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String otpCode) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("SkillHub Email Verification Code");
            String html =
                "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>" +
                "<title>SkillHub Email Verification</title></head>" +
                "<body style=\"margin:0;background:#f0f9fb;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;\">" +

                  "<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(20,184,166,.15);overflow:hidden;border:1px solid #e2e8f0;\">" +
                    // Top gradient bar
                    "<tr><td style=\"height:6px;background:linear-gradient(135deg,#14b8a6 0%,#06b6d4 50%,#3b82f6 100%)\"></td></tr>" +

                    // Header
                    "<tr><td style=\"padding:28px 28px 0 28px;text-align:center;\">" +
                      "<div style=\"display:inline-block;padding:10px 12px;border-radius:12px;background:linear-gradient(135deg,#14b8a6,#06b6d4);box-shadow:0 6px 20px rgba(20,184,166,.25);\">" +
                        "<span style=\"display:inline-block;color:#ffffff;font-weight:700;font-size:18px;letter-spacing:.5px;\">SkillHub</span>" +
                      "</div>" +
                      "<h1 style=\"margin:18px 0 6px 0;font-size:24px;line-height:1.3;color:#0f172a;font-weight:800;\">Verify your email</h1>" +
                      "<p style=\"margin:0 0 6px 0;color:#334155;font-size:14px;line-height:1.6;\">Use the verification code below to finish setting up your account.</p>" +
                    "</td></tr>" +

                    // OTP Box
                    "<tr><td style=\"padding:20px 28px 8px 28px;\">" +
                      "<div style=\"text-align:center;background:#ecfeff;border:1px solid #99f6e4;border-radius:14px;padding:16px 22px;\">" +
                        "<div style=\"font-size:28px;font-weight:800;letter-spacing:10px;color:#0f766e;\">" + otpCode + "</div>" +
                      "</div>" +
                    "</td></tr>" +

                    // Info
                    "<tr><td style=\"padding:6px 28px 0 28px;text-align:center;\">" +
                      "<p style=\"margin:10px 0 0 0;color:#64748b;font-size:12px;\">This code expires in <strong style='color:#0f766e;'>5 minutes</strong>.</p>" +
                      "<p style=\"margin:6px 0 0 0;color:#64748b;font-size:12px;\">If you didn’t request this, you can safely ignore this email.</p>" +
                    "</td></tr>" +

                    // CTA (optional, safe fallback #)
                    "<tr><td style=\"padding:18px 28px 0 28px;text-align:center;\">" +
                      "<a href=\"#\" style=\"display:inline-block;background:linear-gradient(135deg,#14b8a6,#06b6d4);color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px;box-shadow:0 10px 24px rgba(20,184,166,.25);\">Open SkillHub</a>" +
                    "</td></tr>" +

                    // Divider
                    "<tr><td style=\"padding:22px 28px 0 28px;\"><hr style=\"border:none;height:1px;background:#e2e8f0;\"/></td></tr>" +

                    // Footer
                    "<tr><td style=\"padding:16px 28px 28px 28px;text-align:center;color:#94a3b8;font-size:12px;line-height:1.6;\">" +
                      "<div>© " + java.time.Year.now() + " SkillHub • Secure verification</div>" +
                      "<div style=\"margin-top:6px;\">Vijayawada, India</div>" +
                    "</td></tr>" +
                  "</table>" +

                "</body></html>";
            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new IllegalStateException("Failed to send verification email");
        }
    }
}
