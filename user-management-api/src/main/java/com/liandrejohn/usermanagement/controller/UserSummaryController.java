package com.liandrejohn.usermanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liandrejohn.usermanagement.dto.UserSummary;
import com.liandrejohn.usermanagement.repository.UserRepository;

@RestController
public class UserSummaryController {

  private final UserRepository userRepository;

  public UserSummaryController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/user-summary")
  public UserSummary getSummary() {
    return new UserSummary(
        userRepository.count(),
        userRepository.countByTeamIgnoreCase("Engineering"),
        userRepository.countByTeamIgnoreCase("Marketing"),
        userRepository.countByTeamIgnoreCase("Design"));
  }
}
