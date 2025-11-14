package com.skillhub.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public record LoginResponse(
        UUID id,
        String name,
        String email,
        String role,
        String token,
        @JsonProperty("isVerified") boolean isVerified
) {}
