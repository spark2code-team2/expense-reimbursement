package com.expense_reimbursement.expense.exception;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message, null);
    }
}
