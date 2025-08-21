package com.expense_reimbursement.expense.service;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.entities.User;
import com.expense_reimbursement.expense.exception.employeeNotFoundException;
import com.expense_reimbursement.expense.exception.expenseNotFoundException;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import com.expense_reimbursement.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    private UserRepository userRepository;

    public void addExpense(Expense expense, long employeeId) throws employeeNotFoundException {
        if(expenseRepository.existsById(employeeId))
        {
            expenseRepository.save(expense);
        }
        else
        {
            throw new employeeNotFoundException("employee not found with id : " + employeeId);
        }
    }

    public void editExpense(Expense expense, long userId, long id) throws employeeNotFoundException, expenseNotFoundException
    {
        if(!(expenseRepository.existsById(userId)))
        {
            throw new employeeNotFoundException("user not found with id : " + userId);
        }
        if(!(expenseRepository.existsById(id)) || id != expense.getId())
        {
            throw new expenseNotFoundException("expense not found with id or there is problem with entered : " + id);
        }

        expense.setUser();

        expenseRepository.save(expense);
    }





}
