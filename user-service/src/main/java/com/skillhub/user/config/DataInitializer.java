package com.skillhub.user.config;

import com.skillhub.user.model.User;
import com.skillhub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Check if admin already exists
        if (userRepository.existsByEmail("shyamsundarbezawada5@gmail.com")) {
            System.out.println("✅ Admin user already exists. Skipping initialization.");
            return;
        }

        // Create admin user
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("shyamsundarbezawada5@gmail.com");
        admin.setPasswordHash(passwordEncoder.encode("Admin@123")); // Secure default
        admin.setRole("ROLE_ADMIN");
        admin.setDisplayName("SkillHub Admin");
        admin.setBio("System administrator with full access");
        admin.setVerified(true);

        userRepository.save(admin);
        System.out.println("🚀 Default admin user created: shyamsundarbezawada5@gmail.com / Admin@123");
    }
}
