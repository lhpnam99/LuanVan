package com.gmail.namb1704836.ecommerce.dto;

import lombok.Data;

@Data
public class PasswordResetDto {
	private String email;
	private String password;
	private String password2;
}
