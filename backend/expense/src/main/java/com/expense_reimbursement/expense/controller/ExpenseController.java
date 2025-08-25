package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.Services.MappingServices;
import com.expense_reimbursement.expense.dto.*;
import com.expense_reimbursement.expense.dto.ExpenseRequestObject;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.Services.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("employee")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private MappingServices  mappingServices;

    @PostMapping(path = "{employeeId}/addexpense", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ExpenseRequestObject addExpense(@RequestPart("employeeRequest") @Valid EmployeeRequestValidation employeeRequest,
                           @PathVariable long employeeId,
                           @RequestPart("file") MultipartFile file) throws Exception
    {
        employeeRequest.setReceiptPath(expenseService.uploadFile(file));
        Expense expense = mappingServices.convertToExpense(employeeRequest);
        expenseService.addExpense(expense, employeeId);
        return mappingServices.getExpense(expense);
    }

    @PutMapping( path = "{employeeId}/editexpense/{expenseId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ExpenseRequestObject editExpense(@RequestPart("employeeRequest") @Valid EmployeeRequestValidation employeeRequest,
                               @PathVariable long employeeId,
                               @RequestPart("file") MultipartFile file,
                               @PathVariable long expenseId
    ) throws Exception
    {
        employeeRequest.setReceiptPath(expenseService.uploadFile(file));
        Expense expense = mappingServices.editExpense(employeeRequest, expenseId);
        expenseService.editExpense(expense);
        return mappingServices.getExpense(expense);
    }

    @DeleteMapping("{employeeId}/delete_expense/{id}")
    public void deleteExpense(@PathVariable long employeeId, @PathVariable long id) throws Exception
    {
       expenseService.deleteExpense(id);
    }

    @GetMapping("{employeeId}/expenses")
    public List<ExpenseRequestObject> getExpense(@PathVariable long employeeId) throws Exception
    {
       return expenseService.getExpenseList(employeeId);
    }

}
