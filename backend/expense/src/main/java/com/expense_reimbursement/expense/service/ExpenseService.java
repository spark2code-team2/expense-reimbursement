package com.expense_reimbursement.expense.service;

import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    private final String UPLOAD_DIR = "uploads";

    public Expense saveExpenseWithFile(Expense expense, MultipartFile file) throws IOException {
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        if (file != null && !file.isEmpty()) {
            String filename = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            Files.copy(file.getInputStream(), filePath);

            expense.setReceiptPath(filePath.toString());
        }

        expense.setCreatedAt(LocalDateTime.now());

        return expenseRepository.save(expense);
    }
}
