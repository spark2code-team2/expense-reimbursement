package com.expense_reimbursement.expense.dto;

import jakarta.validation.constraints.*;

public class DecisionRequest {
    @NotBlank
    @Pattern(regexp = "(?i)approved|rejected", message = "decision must be Approved or Rejected")
    private String decision;

    private String comments;

    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

}
