package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.service.ExpenseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @PostMapping("/upload")
    public ResponseEntity<?> uploadExpense(
            @RequestPart("expense") String expenseJson,
            @RequestPart("file") MultipartFile file) {

        try {
            Expense expense = objectMapper.readValue(expenseJson, Expense.class);
            Expense savedExpense = expenseService.saveExpenseWithFile(expense, file);
            return ResponseEntity.ok(savedExpense);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Could not upload file: " + e.getMessage());
        }
    }
}
