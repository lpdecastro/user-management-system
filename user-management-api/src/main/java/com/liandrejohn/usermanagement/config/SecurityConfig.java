package com.liandrejohn.usermanagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  UserDetailsService userDetailsService(
      PasswordEncoder encoder,
      @Value("${app.admin.password}") String password) {

    var admin = User.withUsername("admin@example.com")
        .password(encoder.encode(password))
        .roles("ADMIN")
        .build();

    return new InMemoryUserDetailsManager(admin);
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/csrf", "/auth/login").permitAll()
            .anyRequest().authenticated())
        .formLogin(form -> form
            .loginProcessingUrl("/auth/login")
            .successHandler((request, response, authentication) -> {
              response.setStatus(HttpStatus.OK.value());
              response.setContentType(MediaType.APPLICATION_JSON_VALUE);
              response.getWriter().write("{\"message\":\"Login successful\"}");
            })
            .failureHandler((request, response, exception) -> {
              response.setStatus(HttpStatus.UNAUTHORIZED.value());
              response.setContentType(MediaType.APPLICATION_JSON_VALUE);
              response.getWriter().write("{\"message\":\"Invalid email or password\"}");
            }))
        .logout(logout -> logout
            .logoutUrl("/auth/logout")
            .logoutSuccessHandler(
                (request, response, authentication) -> response.setStatus(HttpStatus.NO_CONTENT.value())))
        .exceptionHandling(ex -> ex.authenticationEntryPoint(
            (request, response, exception) -> response.sendError(HttpStatus.UNAUTHORIZED.value())))
        .build();
  }
}
