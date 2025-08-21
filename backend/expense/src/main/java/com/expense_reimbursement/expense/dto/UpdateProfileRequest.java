package com.expense_reimbursement.expense.dto;

import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {
    public String name;
    public String department;

    @Size(min = 6)
    public String newPassword; // optional
}
