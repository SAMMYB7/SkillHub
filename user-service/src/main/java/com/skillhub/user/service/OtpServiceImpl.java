package com.skillhub.user.service;

import com.skillhub.user.model.Otp;
import com.skillhub.user.model.User;
import com.skillhub.user.repository.OtpRepository;
import com.skillhub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;

    private static final int OTP_LENGTH = 6;
    private static final int OTP_VALID_MINUTES = 5;

    @Override
    @Transactional
    public void generateOtpForUser(User user) {
        deletePreviousOtps(user.getId());
        String otpCode = generateNumericOtp(OTP_LENGTH);
        LocalDateTime now = LocalDateTime.now();
        Otp otp = Otp.builder()
                .userId(user.getId())
                .otpCode(otpCode)
                .createdAt(now)
                .expiresAt(now.plusMinutes(OTP_VALID_MINUTES))
                .build();
        otpRepository.save(otp);
        emailService.sendVerificationEmail(user.getEmail(), otpCode);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean validateOtp(UUID userId, String otpCode) {
        List<Otp> otps = otpRepository.findByUserIdOrderByCreatedAtDesc(userId);
        if (otps.isEmpty()) return false;
        Otp latest = otps.get(0);
        if (latest.getExpiresAt().isBefore(LocalDateTime.now())) return false;
        return latest.getOtpCode().equals(otpCode);
    }

    @Override
    @Transactional
    public void deletePreviousOtps(UUID userId) {
        otpRepository.deleteByUserId(userId);
    }

    private String generateNumericOtp(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}
