package com.liandrejohn.usermanagement.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(EmailAlreadyExistsException.class)
  public ResponseEntity<Map<String, String>> handleDuplicateEmail(EmailAlreadyExistsException ex) {

    return ResponseEntity
        .status(HttpStatus.CONFLICT)
        .body(Map.of(
            "code", "EMAIL_ALREADY_EXISTS",
            "field", "email",
            "message", ex.getMessage()));
  }
}
