package com.skillhub.gateway.config;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthHeaderForwarder {
	
	public AuthHeaderForwarder() {
        System.out.println(">>> AuthHeaderForwarder LOADED");
    }

    @Bean
    public GlobalFilter forwardAuthHeaderFilter() {
        return (exchange, chain) -> {
            String auth = exchange.getRequest().getHeaders().getFirst("Authorization");

            System.out.println(">>> GATEWAY FILTER ACTIVE");
            System.out.println(">>> Header from client = " + auth);

            return chain.filter(
                exchange.mutate()
                        .request(r -> {
                            if (auth != null && !auth.isBlank()) {
                                r.header("Authorization", auth);
                            }
                        })
                        .build()
            );
        };
    }
}
