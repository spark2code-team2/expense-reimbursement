package com.expense_reimbursement.expense.dto;

import jakarta.validation.constraints.*;

public class LoginRequest {
    @Email @NotBlank public String email;
    @NotBlank public String password;
}
