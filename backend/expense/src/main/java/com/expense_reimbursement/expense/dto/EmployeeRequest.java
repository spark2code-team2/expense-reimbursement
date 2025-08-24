package com.expense_reimbursement.expense.dto;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class EmployeeRequest extends Expense {

    @NotBlank(message = "title should not be empty")
    @NotNull(message = "title should not be null")
    private String title;

    @NotBlank(message = "category should not be empty")
    @NotNull(message = "category should not be null")
    private String category;

    //try this @DIgits
    @Min(value = 1, message =  "the amount should be greater than 1")
    @NotNull(message = "amount should not be null")
    private Double amount;

    @NotBlank(message = "currency should not be empty")
    @NotNull(message = "currency should not be null")
    private String currency;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "dateIncurred should not be null")
    private LocalDate dateIncurred;

    @NotBlank(message = "description should not be empty")
    @NotNull(message = "description should not be null")
    private String description;

//    @NotBlank(message = "receipt should not be empty")
//    @NotNull(message = "receipt should not be null u need to provide the link")
    private String receiptPath;

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

    public LocalDate getDateIncurred() {
        return dateIncurred;
    }

    public void setDateIncurred(LocalDate dateIncurred) {
        this.dateIncurred = dateIncurred;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReceiptPath() {
        return receiptPath;
    }

    public void setReceiptPath(String receiptPath) {
        this.receiptPath = receiptPath;
    }

}
