package com.expense_reimbursement.expense.dto;

import jakarta.validation.constraints.*;

public class LoginRequest {
    @Email(message = "please Enter valid email") @NotBlank(message = "the email must not be empty") public String email;
    @NotBlank(message = "the password must not be empty") public String password;
}
