package com.expense_reimbursement.expense.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "approvals")
public class Approval {
    public enum Status {
        APPROVED, REJECTED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "expense_id")
    private Expense expense;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Enumerated(EnumType.STRING)
    private Status status;
    private String comments;
    private LocalDateTime decidedAt;
    public Approval() {}
    public Approval(Long id, Expense expense, User manager, Status status,
                    String comments, LocalDateTime decidedAt) {
        this.id = id;
        this.expense = expense;
        this.manager = manager;
        this.status = status;
        this.comments = comments;
        this.decidedAt = decidedAt;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Expense getExpense() { return expense; }
    public void setExpense(Expense expense) { this.expense = expense; }
    public User getManager() { return manager; }
    public void setManager(User manager) { this.manager = manager; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public LocalDateTime getDecidedAt() { return decidedAt; }
    public void setDecidedAt(LocalDateTime decidedAt) { this.decidedAt = decidedAt; }
}