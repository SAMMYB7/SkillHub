package com.skillhub.user.repository;

import com.skillhub.user.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    List<Otp> findByUserIdOrderByCreatedAtDesc(UUID userId);
    void deleteByUserId(UUID userId);
}
