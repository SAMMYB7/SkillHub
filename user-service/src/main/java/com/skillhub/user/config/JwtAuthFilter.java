//package com.skillhub.user.config;
//
//import com.skillhub.user.service.JwtService;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.lang.Nullable;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.Collections;
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthFilter extends OncePerRequestFilter {
//
//    private final JwtService jwtService;
//
//    // Optional placeholder; may be null if not defined yet
//    @Autowired(required = false)
//    @Nullable
//    private UserDetailsService userDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//            String username = jwtService.extractUsername(token);
//            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                boolean valid = jwtService.isTokenValid(token, username);
//                if (valid) {
//                    String role = jwtService.extractRole(token);
//                    UserDetails userDetails = loadUserDetails(username);
//                    // Build authorities including role from token
//                    List<SimpleGrantedAuthority> authorities = role != null ? List.of(new SimpleGrantedAuthority(role)) : List.of();
//                    UsernamePasswordAuthenticationToken authentication =
//                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//
//    private UserDetails loadUserDetails(String username) {
//        if (userDetailsService != null) {
//            try {
//                return userDetailsService.loadUserByUsername(username);
//            } catch (Exception ignored) {
//                // Fallback to simple user
//            }
//        }
//        // Fallback simple UserDetails without authorities
//        return new User(username, "", Collections.emptyList());
//    }
//}
package com.skillhub.user.config;

import com.skillhub.user.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Autowired(required = false)
    @Nullable
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
    	System.out.println("\n========== JWT FILTER DEBUG ==========");
    	System.out.println("Request: " + request.getMethod() + " " + request.getRequestURI());

    	String rawAuth = request.getHeader("Authorization");
    	System.out.println("Authorization header raw = " + rawAuth);

    	if (rawAuth == null) {
    	    System.out.println("❌ NO AUTH HEADER FOUND");
    	} else {
    	    System.out.println("✔ AUTH HEADER PRESENT, length=" + rawAuth.length());
    	}

    	if (rawAuth != null && rawAuth.startsWith("Bearer ")) {
    	    String token = rawAuth.substring(7);
    	    System.out.println("Token: " + token);

    	    String extractedEmail = jwtService.extractUsername(token);
    	    System.out.println("Extracted username: " + extractedEmail);

    	    String role = jwtService.extractRole(token);
    	    System.out.println("Extracted role: " + role);

    	    boolean valid = jwtService.isTokenValid(token);
    	    System.out.println("Token valid? " + valid);

    	    if (!valid) {
    	        System.out.println("❌ TOKEN IS INVALID");
    	    } else {
    	        System.out.println("✔ TOKEN VALID");
    	    }
    	}

    	System.out.println("========== END JWT FILTER DEBUG ==========\n");


        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtService.extractUsername(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Just validate token expiry
                if (jwtService.isTokenValid(token)) {

                    String role = jwtService.extractRole(token);
                    List<SimpleGrantedAuthority> authorities =
                            role != null ? List.of(new SimpleGrantedAuthority(role)) : List.of();

                    UserDetails userDetails =
                            org.springframework.security.core.userdetails.User
                                    .withUsername(email)
                                    .password("")
                                    .authorities(authorities)
                                    .build();

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }



    private UserDetails loadUserDetails(String username) {
        if (userDetailsService != null) {
            try {
                return userDetailsService.loadUserByUsername(username);
            } catch (Exception ignored) {
                // fall back
            }
        }
        return new User(username, "", Collections.emptyList());
    }
}
