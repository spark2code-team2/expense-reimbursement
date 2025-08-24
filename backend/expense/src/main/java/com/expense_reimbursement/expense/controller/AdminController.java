package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.repository.UserRepository;
import com.expense_reimbursement.expense.Services.ExpenseService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import com.expense_reimbursement.expense.Services.*;
import com.expense_reimbursement.expense.entities.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CsvService csvService;

    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/export/csv")
    public ResponseEntity<String> exportExpensesToCsv() {
        try {
            List<Expense> expenses = expenseService.getAllExpenses();
            String csvContent = csvService.exportExpensesToCsv(expenses);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);
            headers.setContentDispositionFormData("attachment", "expenses.csv");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvContent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to export CSV: " + e.getMessage());
        }
    }


}