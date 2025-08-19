package com.expense_reimbursement.expense.repository;

import com.expense_reimbursement.expense.entities.Expense;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {
}
