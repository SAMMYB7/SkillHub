package com.skillhub.user.service;

import com.skillhub.user.dto.LoginDto;
import com.skillhub.user.dto.RegisterDto;
import com.skillhub.user.dto.UserDto;
import com.skillhub.user.model.User;
import com.skillhub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService; 
    private final OtpService otpService; // Inject OTP service

    @Transactional
    public UserDto registerUser(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole("ROLE_STUDENT");
        user.setDisplayName(registerDto.getDisplayName());
        user.setVerified(false); // ensure not verified yet

        User saved = userRepository.save(user);
        // Generate OTP and send email
        otpService.generateOtpForUser(saved);
        return mapToUserDto(saved);
    }

    public String loginUser(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        if (!user.isVerified()) {
            throw new IllegalArgumentException("Account not verified. Please verify OTP sent to your email.");
        }
        // Include role in the token
        return jwtService.generateToken(user.getEmail(), user.getRole());
    }

    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return mapToUserDto(user);
    }

    public UserDto getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return mapToUserDto(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserDto)
                .toList();
    }

    private UserDto mapToUserDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setDisplayName(user.getDisplayName());
        dto.setBio(user.getBio());
        dto.setRole(user.getRole());
        dto.setVerified(user.isVerified());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}