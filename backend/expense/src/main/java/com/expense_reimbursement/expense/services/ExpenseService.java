package com.expense_reimbursement.expense.services;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.exception.employeeNotFoundException;
import com.expense_reimbursement.expense.exception.expenseAlreadyReviwedException;
import com.expense_reimbursement.expense.exception.expenseNotFoundException;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import com.expense_reimbursement.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.expense_reimbursement.expense.entities.Expense.Status.PENDING;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    public void addExpense(Expense expense, long employeeId) throws employeeNotFoundException {
        if(userRepository.existsById(employeeId))
        {
            expense.setUser(userRepository.getById(employeeId));
            expense.setStatus(PENDING);
            expense.setCreatedAt(LocalDateTime.now());
            expenseRepository.save(expense);
        }
        else
        {
            throw new employeeNotFoundException("employee not found with id : " + employeeId);
        }
    }

    // the id represents the expense id
    public void editExpense(Expense expense, long employeeId, long id) throws employeeNotFoundException, expenseNotFoundException, expenseAlreadyReviwedException
    {
        if (!(expense.getStatus().equals(PENDING)))
        {
            throw new expenseAlreadyReviwedException("expense id :" + id + " already reviewed no changes can be done");
        }
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

        for(Expense expense : expenseRepository.findAll())
        {
            if (Objects.equals(expense.getUser().getId(), userId))
            {
                expenses.add(expense);
            }
        }

        return expenses;
    }

}
