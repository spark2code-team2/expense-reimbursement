package com.expense_reimbursement.expense.controller;

import com.expense_reimbursement.expense.dto.AuthResponse;
import com.expense_reimbursement.expense.dto.LoginRequest;
import com.expense_reimbursement.expense.dto.RegisterRequest;
import com.expense_reimbursement.expense.entities.User;
import com.expense_reimbursement.expense.repository.UserRepository; // or .repository
import com.expense_reimbursement.expense.Security.JwtService;
import com.expense_reimbursement.expense.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authManager;
    private final JwtService jwt;
    private final UserRepository users;
    private final UserDetailsService uds;

    public AuthController(AuthService authService,
                          AuthenticationManager authManager,
                          JwtService jwt,
                          UserRepository users,
                          UserDetailsService uds) {
        this.authService = authService;
        this.authManager = authManager;
        this.jwt = jwt;
        this.users = users;
        this.uds = uds;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        User u = authService.register(req);
        UserDetails ud = uds.loadUserByUsername(u.getEmail());
        String token = jwt.generate(ud);
        return ResponseEntity.ok(new AuthResponse(token, u.getRole().name(), u.getName(), u.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email, req.password)
        );
        User u = users.findByEmail(req.email).orElseThrow();
        UserDetails ud = uds.loadUserByUsername(u.getEmail());
        String token = jwt.generate(ud);
        return ResponseEntity.ok(new AuthResponse(token, u.getRole().name(), u.getName(), u.getEmail()));
    }
}
