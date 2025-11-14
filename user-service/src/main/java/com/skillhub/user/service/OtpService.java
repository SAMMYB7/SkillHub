package com.skillhub.user.service;

import com.skillhub.user.model.User;

import java.util.UUID;

public interface OtpService {
    void generateOtpForUser(User user);
    boolean validateOtp(UUID userId, String otpCode);
    void deletePreviousOtps(UUID userId);
}
