package com.expense_reimbursement.expense.repository;

import com.expense_reimbursement.expense.entities.Expense;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends CrudRepository<Expense, Long> {

    public List <Expense> findByUserId(Long userId);
}
