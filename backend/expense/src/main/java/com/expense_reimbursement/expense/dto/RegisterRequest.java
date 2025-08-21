package com.expense_reimbursement.expense.dto;

import com.expense_reimbursement.expense.entities.User.Role;
import jakarta.validation.constraints.*;

public class RegisterRequest {
    @Email @NotBlank public String email;
    @NotBlank @Size(min = 6) public String password;
    @NotBlank public String name;
    public Role role; // optional; default EMPLOYEE if null
    public String department;
}
