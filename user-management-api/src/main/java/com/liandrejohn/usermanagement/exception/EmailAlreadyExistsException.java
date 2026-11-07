package com.liandrejohn.usermanagement.exception;

public class EmailAlreadyExistsException extends RuntimeException {

  public EmailAlreadyExistsException() {
    super("Email address is already in use");
  }
}
