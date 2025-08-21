package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.dto.UpdateProfileRequest;
import com.expense_reimbursement.expense.entities.User;
import com.expense_reimbursement.expense.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserRepository users;
    private final PasswordEncoder encoder;

    public ProfileController(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    @GetMapping("/me")
    public User me(@AuthenticationPrincipal UserDetails principal) {
        return users.findByEmail(principal.getUsername()).orElseThrow();
    }

    @PutMapping("/me")
    public User update(@AuthenticationPrincipal UserDetails principal,
                       @Valid @RequestBody UpdateProfileRequest req) {
        User u = users.findByEmail(principal.getUsername()).orElseThrow();
        if (req.name != null) u.setName(req.name);
        if (req.department != null) u.setDepartment(req.department);
        if (req.newPassword != null) u.setPasswordHash(encoder.encode(req.newPassword));
        return users.save(u);
    }
}
