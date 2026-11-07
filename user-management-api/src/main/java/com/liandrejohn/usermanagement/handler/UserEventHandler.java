package com.liandrejohn.usermanagement.handler;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import com.liandrejohn.usermanagement.entity.User;
import com.liandrejohn.usermanagement.exception.EmailAlreadyExistsException;
import com.liandrejohn.usermanagement.repository.UserRepository;

@Component
@RepositoryEventHandler(User.class)
public class UserEventHandler {

  private final UserRepository userRepository;

  public UserEventHandler(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @HandleBeforeCreate
  public void beforeCreate(User user) {
    user.setEmail(user.getEmail().trim().toLowerCase());

    if (userRepository.existsByEmailIgnoreCase(user.getEmail())) {
      throw new EmailAlreadyExistsException();
    }
  }

  @HandleBeforeSave
  public void beforeSave(User user) {
    user.setEmail(user.getEmail().trim().toLowerCase());

    if (userRepository.existsByEmailIgnoreCaseAndIdNot(user.getEmail(), user.getId())) {
      throw new EmailAlreadyExistsException();
    }
  }
}
