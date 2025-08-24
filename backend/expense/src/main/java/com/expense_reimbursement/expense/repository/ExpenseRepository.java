package com.expense_reimbursement.expense.repository;

import com.expense_reimbursement.expense.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
       List<Expense> findAllByUserIdAndStatus(Long managerId, Expense.Status status);
       List<Expense> findAllByUserId(Long userId);
}
