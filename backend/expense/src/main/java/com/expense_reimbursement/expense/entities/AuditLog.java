package com.expense_reimbursement.expense.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String action;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String entity;
    private Long entityId;
    private LocalDateTime timestamp;
    public AuditLog() {}
    public AuditLog(Long id, String action, User user, String entity,
                    Long entityId, LocalDateTime timestamp) {
        this.id = id;
        this.action = action;
        this.user = user;
        this.entity = entity;
        this.entityId = entityId;
        this.timestamp = timestamp;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getEntity() { return entity; }
    public void setEntity(String entity) { this.entity = entity; }
    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}