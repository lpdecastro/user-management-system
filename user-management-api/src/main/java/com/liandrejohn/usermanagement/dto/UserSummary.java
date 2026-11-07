package com.liandrejohn.usermanagement.dto;

public record UserSummary(
    long totalUsers,
    long engineering,
    long marketing,
    long design) {

}
