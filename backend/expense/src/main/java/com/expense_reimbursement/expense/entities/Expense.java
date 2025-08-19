package com.expense_reimbursement.expense.entities;
import jakarta.persistence.*;
        import java.time.LocalDate;
import java.time.LocalDateTime;

    @Entity
    @Table(name = "expenses")
    public class Expense {
        public enum Status {
            PENDING, APPROVED, REJECTED
        }
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;
        private String title;
        private String category;
        private Double amount;
        private String currency;
        private LocalDate dateIncurred;
        private String description;
        @Enumerated(EnumType.STRING)
        private Status status;
        private String receiptPath;
        private LocalDateTime createdAt;
        public Expense() {}
        public Expense(Long id, User user, String title, String category, Double amount,
                       String currency, LocalDate dateIncurred, String description,
                       Status status, String receiptPath, LocalDateTime createdAt) {
            this.id = id;
            this.user = user;
            this.title = title;
            this.category = category;
            this.amount = amount;
            this.currency = currency;
            this.dateIncurred = dateIncurred;
            this.description = description;
            this.status = status;
            this.receiptPath = receiptPath;
            this.createdAt = createdAt;
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public User getUser() { return user; }
        public void setUser(User user) { this.user = user; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Double getAmount() { return amount; }
        public void setAmount(Double amount) { this.amount = amount; }
        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }
        public LocalDate getDateIncurred() { return dateIncurred; }
        public void setDateIncurred(LocalDate dateIncurred) { this.dateIncurred = dateIncurred; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Status getStatus() { return status; }
        public void setStatus(Status status) { this.status = status; }
        public String getReceiptPath() { return receiptPath; }
        public void setReceiptPath(String receiptPath) { this.receiptPath = receiptPath; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

