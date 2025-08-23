package com.expense_reimbursement.expense.dto;

import com.expense_reimbursement.expense.entities.User.Role;
import jakarta.validation.constraints.*;

public class RegisterRequest {
    @Email(message = "please Enter valid email") @NotBlank(message = "email must not be empty") public String email;
    @NotBlank(message = "password must not be empty") @Size(min = 6, message = "password length must be greater than 5") public String password;
    @NotBlank(message = "name must not be empty") public String name;
    public Role role; // optional; default EMPLOYEE if null
    public String department;

}
