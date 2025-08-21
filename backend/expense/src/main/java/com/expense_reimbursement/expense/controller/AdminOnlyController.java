package com.expense_reimbursement.expense.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminOnlyController {
    @GetMapping("/ping")
    @PreAuthorize("hasRole('ADMIN')")
    public String ping() {
        return "admin ok ✅";
    }
}
