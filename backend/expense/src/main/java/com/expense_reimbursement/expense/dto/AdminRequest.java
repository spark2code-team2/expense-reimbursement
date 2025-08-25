package com.expense_reimbursement.expense.dto;

import java.time.LocalDate;

public class AdminRequest {
   private long expenseId ;
   private long userId ;
   private String Name ;
   private String title;
   private Double amount;
   private String status;
   private LocalDate dateIncurred;
   private String description;

   public long getExpenseId() {
      return expenseId;
   }

   public void setExpenseId(long expenseId) {
      this.expenseId = expenseId;
   }

   public long getUserId() {
      return userId;
   }

   public void setUserId(long userId) {
      this.userId = userId;
   }

   public String getName() {
      return Name;
   }

   public void setName(String name) {
      Name = name;
   }

   public Double getAmount() {
      return amount;
   }

   public void setAmount(Double amount) {
      this.amount = amount;
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
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

   public String getTitle() {
      return title;
   }

   public void setTitle(String title) {
      this.title = title;
   }
}
