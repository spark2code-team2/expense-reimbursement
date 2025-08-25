package com.expense_reimbursement.expense.Services;

import com.expense_reimbursement.expense.dto.AdminRequest;
import com.expense_reimbursement.expense.dto.EmployeeRequestValidation;
import com.expense_reimbursement.expense.dto.ExpenseRequestObject;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MappingServices {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense convertToExpense(EmployeeRequestValidation requestObject) {
        Expense obj = new Expense();
        obj.setTitle(requestObject.getTitle());
        obj.setCategory(requestObject.getCategory());
        obj.setAmount(requestObject.getAmount());
        obj.setCurrency(requestObject.getCurrency());
        obj.setDescription(requestObject.getDescription());
        obj.setCreatedAt(LocalDateTime.now());
        obj.setDateIncurred(requestObject.getDateIncurred());
        obj.setStatus(Expense.Status.PENDING);
        obj.setReceiptPath(requestObject.getReceiptPath());

        return obj;
    }

    public Expense editExpense(EmployeeRequestValidation requestObject, long expenseId) {
        Expense obj = expenseRepository.getById(expenseId);
        obj.setTitle(requestObject.getTitle());
        obj.setCategory(requestObject.getCategory());
        obj.setAmount(requestObject.getAmount());
        obj.setCurrency(requestObject.getCurrency());
        obj.setDescription(requestObject.getDescription());
        obj.setCreatedAt(LocalDateTime.now());
        obj.setDateIncurred(requestObject.getDateIncurred());
        obj.setStatus(Expense.Status.PENDING);
        obj.setReceiptPath(requestObject.getReceiptPath());

        return obj;
    }

    public ExpenseRequestObject getExpense(Expense expense){

        ExpenseRequestObject obj = new ExpenseRequestObject();

        obj.setId(expense.getId());
        obj.setManagerId(expense.getUser().getManager().getId());
        obj.setUserId(expense.getUser().getId());
        obj.setTitle(expense.getTitle());
        obj.setCategory(expense.getCategory());
        obj.setAmount(expense.getAmount());
        obj.setCurrency(expense.getCurrency());
        obj.setDescription(expense.getDescription());
        obj.setCratedAt(expense.getCreatedAt());
        obj.setDateIncurred(expense.getDateIncurred());
        obj.setStatus(expense.getStatus().toString());
        obj.setReceiptPath(expense.getReceiptPath());

        return obj;
    }


    public List<ExpenseRequestObject> convertList(List <Expense> expenses)
    {
        List<ExpenseRequestObject> modifiedExpense = new ArrayList<>();

        for(Expense expense : expenses)
        {
            modifiedExpense.add(getExpense(expense));
        }

        return modifiedExpense;
    }


    public List<AdminRequest> convertListT(List <Expense> expenses)
    {
        List<AdminRequest> modifiedExpense = new ArrayList<>();

        for(Expense expense : expenses)
        {
            modifiedExpense.add(getInfo(expense));
        }

        return modifiedExpense;
    }

    public AdminRequest getInfo(Expense expense)
    {
        AdminRequest obj =  new AdminRequest();
        obj.setExpenseId(expense.getId());
        obj.setUserId(expense.getUser().getId());
        obj.setName(expense.getUser().getName());
        obj.setAmount(expense.getAmount());
        obj.setTitle(expense.getTitle());
        obj.setDateIncurred(expense.getDateIncurred());
        obj.setStatus(expense.getStatus().toString());
        obj.setDescription(expense.getDescription());

        return obj;
    }
}
