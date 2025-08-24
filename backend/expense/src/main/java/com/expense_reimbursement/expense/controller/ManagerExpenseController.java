package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.dto.DecisionRequest;
import com.expense_reimbursement.expense.entities.AuditLog;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.entities.Notification;
import com.expense_reimbursement.expense.entities.User;
import com.expense_reimbursement.expense.exception.ForbiddenException;
import com.expense_reimbursement.expense.exception.ResourceNotFoundException;
import com.expense_reimbursement.expense.repository.AuditLogRepository;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import com.expense_reimbursement.expense.repository.NotificationRepository;
import com.expense_reimbursement.expense.repository.UserRepository;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerExpenseController {

    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private AuditLogRepository auditLogRepository;
    @Autowired private NotificationRepository notificationRepository;
    @Autowired private UserRepository userRepository;

    @GetMapping("/{managerId}/pending-expenses")
    @ResponseStatus(HttpStatus.OK)
//    @Transactional(readOnly = true)
    public List<Expense> getPendingExpenses(@PathVariable Long managerId)
    {
        User user = userRepository.findUserByManagerId(managerId);
        List<Expense> pending = expenseRepository.findAllByUserIdAndStatus(user.getId(), Expense.Status.PENDING);

        AuditLog log = new AuditLog(
                null,
                "VIEW_PENDING_EXPENSES",
                makeRefUser(managerId),
                "Expense",
                null,
                LocalDateTime.now()
        );
        auditLogRepository.save(log);

        return pending;
    }

    @PostMapping("/{managerId}/expenses/{expenseId}/decision")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public Expense decideExpense(@PathVariable Long managerId,
                                 @PathVariable Long expenseId,
                                 @RequestBody @Validated DecisionRequest request) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found: " + expenseId));

        long lMangerId =  expense.getUser().getManager().getId();

//        if (expense.getManager() == null || !Objects.equals(expense.getManager().getId(), managerId)) {
        if (expense.getUser().getManager().getId() == null || lMangerId != managerId) {
            throw new ForbiddenException("Not authorized to decide on this expense.");
        }

        String decision = normalizeDecision(request.getDecision()); // Approved / Rejected
//        expense.setStatus(decision);
        expense.setStatus(Expense.Status.valueOf(decision.toUpperCase()));
        expenseRepository.save(expense);

        // Audit: decision
        String action = "Approved".equals(decision) ? "APPROVE_EXPENSE" : "REJECT_EXPENSE";
        auditLogRepository.save(new AuditLog(
                null, action, makeRefUser(managerId),
                "Expense", expense.getId(), LocalDateTime.now()
        ));

        // 3 Notification to employee
        String msg = buildDecisionMessage(expense.getTitle(), decision, request.getComments());
        Notification n = new Notification();
        n.setUser(expense.getUser());
        n.setExpense(expense);
        n.setType("Approved".equals(decision) ? "APPROVAL" : "REJECTION");
        n.setMessage(msg);
        n.setSentAt(LocalDateTime.now());
        notificationRepository.save(n);

        return expense;
    }


    private static String normalizeDecision(String d) {
        String v = d == null ? "" : d.trim();
        if (v.equalsIgnoreCase("approved")) return "Approved";
        if (v.equalsIgnoreCase("rejected")) return "Rejected";
        throw new IllegalArgumentException("decision must be Approved or Rejected");
    }

    private static User makeRefUser(Long id) {
        User u = new User();
        u.setId(id);
        return u;
    }

    private static String buildDecisionMessage(String title, String decision, String comments) {
        String base = "Your expense '" + (title == null ? "" : title) + "' was " + decision + ".";
        if (comments != null && !comments.isBlank()) {
            return base + " Comments: " + comments;
        }
        return base;
    }

}
