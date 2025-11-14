package com.skillhub.user.service;

import com.skillhub.user.dto.LoginDto;
import com.skillhub.user.dto.RegisterDto;
import com.skillhub.user.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {

    /**
     * Registers a new user using the provided data and returns the created user as a DTO.
     */
    UserDto registerUser(RegisterDto registerDto);

    /**
     * Authenticates a user and returns a JWT token upon successful login.
     */
    String loginUser(LoginDto loginDto);

    /**
     * Retrieves a user by email and maps it to a DTO.
     */
    UserDto getUserByEmail(String email);

    /**
     * Retrieves a user by ID and maps it to a DTO.
     */
    UserDto getUserById(UUID id);

    /**
     * Checks if a user exists with the given email.
     */
    boolean existsByEmail(String email);

    /**
     * Retrieves all users and maps them to DTOs.
     */
    List<UserDto> getAllUsers();
}