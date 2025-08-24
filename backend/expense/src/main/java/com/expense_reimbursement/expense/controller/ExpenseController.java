package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.dto.EmployeeRequest;
import com.expense_reimbursement.expense.dto.ExpenseRequestObject;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.Services.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("employee")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;


    @PostMapping(path = "{employeeId}/addexpense", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addExpense(@RequestPart("employeeRequest") @Valid EmployeeRequest employeeRequest,
                           @PathVariable long employeeId,
                           @RequestPart("file") MultipartFile file) throws Exception
    {
        Expense expense = new Expense();
        employeeRequest.setReceiptPath(expenseService.uploadFile(file));
        BeanUtils.copyProperties(employeeRequest, expense);
        expenseService.addExpense(expense, employeeId);
    }

    @PutMapping( path = "{employeeId}/editexpense/{expenseId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Expense editExpense(@RequestPart("employeeRequest")ExpenseRequestObject requestObject,
                               @PathVariable long employeeId, @PathVariable  long expenseId,
                               @RequestPart("file") MultipartFile file
    ) throws Exception
    {
        requestObject.setReceiptPath(expenseService.uploadFile(file));
        requestObject.setId(expenseId);
        requestObject.setUserId(employeeId);
        return expenseService.editExpense(requestObject);
    }

    @DeleteMapping("{employeeId}/delete_expense/{id}")
    public void deleteExpense(@PathVariable long employeeId, @PathVariable long id) throws Exception
    {
       expenseService.deleteExpense(id);
    }

    @GetMapping("{employeeId}/expenses")
    public List<Expense> getExpense(@PathVariable long employeeId) throws Exception
    {
       return expenseService.getExpenseList(employeeId);
    }

}
