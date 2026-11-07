package com.liandrejohn.usermanagement.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @GetMapping("/me")
  public Map<String, String> me(Authentication authentication) {
    return Map.of(
        "email", authentication.getName(),
        "role", "ADMIN");
  }

  @GetMapping("/csrf")
  public CsrfToken csrf(CsrfToken csrfToken) {
    return csrfToken;
  }

}
