package com.expense_reimbursement.expense.dto;
import com.expense_reimbursement.expense.entities.Expense;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ExpenseRequestObject {

    Long id;
    Long userId;
    Long managerId;
    String title;
    String category;
    Double amount;
    String currency;
    String description;
    String status;
    String receiptPath;
    LocalDate dateIncurred;
    LocalDateTime CratedAt;

    public ExpenseRequestObject() {
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReceiptPath() {
        return receiptPath;
    }

    public void setReceiptPath(String receiptPath) {
        this.receiptPath = receiptPath;
    }

    public LocalDate getDateIncurred() {
        return dateIncurred;
    }

    public void setDateIncurred(LocalDate dateIncurred) {
        this.dateIncurred = dateIncurred;
    }

    public LocalDateTime getCratedAt() {
        return CratedAt;
    }

    public void setCratedAt(LocalDateTime cratedAt) {
        CratedAt = cratedAt;
    }
}
