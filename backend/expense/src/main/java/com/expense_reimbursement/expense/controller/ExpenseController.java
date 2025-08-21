package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.dto.EmployeeRequest;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.exception.employeeNotFoundException;
import com.expense_reimbursement.expense.exception.expenseNotFoundException;
import com.expense_reimbursement.expense.services.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping("employee/{employeeId}/addexpense")
    public void addExpense(@RequestBody @Valid EmployeeRequest employeeRequest, @PathVariable long employeeId) throws employeeNotFoundException
    {

        Expense expense = new Expense();

        BeanUtils.copyProperties(employeeRequest, expense);

        expenseService.addExpense(expense, employeeId);
    }

    @PutMapping("employee/{employeeId}/editexpense/{id}")
    public void editExpense(@RequestBody @Valid EmployeeRequest employeeRequest, @PathVariable long employeeId, @PathVariable long id) throws employeeNotFoundException, expenseNotFoundException
    {
        Expense expense = new Expense();

        BeanUtils.copyProperties(employeeRequest, expense);
        expenseService.editExpense(expense, employeeId, id);
    }

    @DeleteMapping("employee/{employeeId}/delete_expense/{id}")
    public void deleteExpense(@PathVariable long employeeId, @PathVariable long id) throws employeeNotFoundException, expenseNotFoundException
    {
       expenseService.deleteExpense(id);
    }

    @GetMapping("employee/{employeeId}/expenses")
    public void getExpense(@PathVariable long employeeId) throws employeeNotFoundException
    {
       expenseService.getExpenseList(employeeId);
    }

}
