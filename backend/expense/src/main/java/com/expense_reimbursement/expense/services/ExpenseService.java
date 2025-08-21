package com.expense_reimbursement.expense.services;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.exception.employeeNotFoundException;
import com.expense_reimbursement.expense.exception.expenseNotFoundException;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import com.expense_reimbursement.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    public void addExpense(Expense expense, long employeeId) throws employeeNotFoundException {
        if(userRepository.existsById(employeeId))
        {
            expenseRepository.save(expense);
        }
        else
        {
            throw new employeeNotFoundException("employee not found with id : " + employeeId);
        }
    }

    public void editExpense(Expense expense, long employeeId, long id) throws employeeNotFoundException, expenseNotFoundException
    {

        if(!(userRepository.existsById(employeeId)))
        {
            throw new employeeNotFoundException("user not found with id : " + employeeId);
        }
        if(!(expenseRepository.existsById(id)) || id != expense.getId())
        {
            throw new expenseNotFoundException("expense not found with id or there is problem with entered : " + id);
        }

        expense.setUser(userRepository.getById(employeeId));

        expenseRepository.save(expense);
    }

    public void deleteExpense(long id)
    {
        expenseRepository.deleteById(id);
    }

    public List<Expense> getExpenseList(Long userId) throws employeeNotFoundException {
        if(!(userRepository.existsById(userId)))
        {
            throw new employeeNotFoundException("user not found with id : " + userId);
        }

        List <Expense> expenses = new ArrayList<>();
        expenseRepository.findByUserId(userId).forEach(expenses::add);
        return expenses;
    }

}
