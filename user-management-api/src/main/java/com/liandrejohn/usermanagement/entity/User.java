package com.liandrejohn.usermanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Email cannot be blank")
  @Column(nullable = false, unique = true)
  private String email;

  @NotBlank(message = "Name cannot be blank")
  @Column(nullable = false)
  private String name;

  @NotBlank(message = "Role cannot be blank")
  @Column(nullable = false)
  private String role;

  @NotBlank(message = "Team cannot be blank")
  @Column(nullable = false)
  private String team;
}
