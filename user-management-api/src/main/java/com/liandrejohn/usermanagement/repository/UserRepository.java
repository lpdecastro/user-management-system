package com.liandrejohn.usermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;

import com.liandrejohn.usermanagement.entity.QUser;
import com.liandrejohn.usermanagement.entity.User;
import com.querydsl.core.types.dsl.StringPath;

public interface UserRepository
    extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User>, QuerydslBinderCustomizer<QUser> {

  @Override
  default void customize(QuerydslBindings bindings, QUser root) {
    bindings.bind(String.class)
        .first((path, value) -> ((StringPath) path).containsIgnoreCase(value));
  }

  boolean existsByEmailIgnoreCase(String email);

  boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

  long countByTeamIgnoreCase(String team);

}
