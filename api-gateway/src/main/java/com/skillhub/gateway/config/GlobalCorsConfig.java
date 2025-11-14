package com.skillhub.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class GlobalCorsConfig {

	 @Bean
	    public CorsWebFilter corsWebFilter() {
	        CorsConfiguration config = new CorsConfiguration();

	        // IMPORTANT: When allowCredentials = true, cannot use "*"
	        config.addAllowedOrigin("http://localhost:5173");
	        config.setAllowCredentials(true);

	        config.addAllowedHeader("*");
	        config.addAllowedMethod("*");

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", config);

	        return new CorsWebFilter(source);
	    }
}
