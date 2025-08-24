package com.expense_reimbursement.expense.Services;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminOnlyService {

    @Autowired
    ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses()
    {
      List <Expense> expensesList =  expenseRepository.findAll();
      return  expensesList;
    }


}
