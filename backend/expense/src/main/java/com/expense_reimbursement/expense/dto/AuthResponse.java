package com.expense_reimbursement.expense.dto;

public class AuthResponse {
    public String token;
    public String role;
    public String name;
    public String email;
    public AuthResponse(String token, String role, String name, String email) {
        this.token = token; this.role = role; this.name = name; this.email = email;
    }
}
