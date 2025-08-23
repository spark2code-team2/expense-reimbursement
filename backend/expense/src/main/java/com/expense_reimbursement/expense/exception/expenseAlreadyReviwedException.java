package com.expense_reimbursement.expense.exception;

public class expenseAlreadyReviwedException extends RuntimeException {
    public expenseAlreadyReviwedException(String message) {
        super(message);
    }
}
