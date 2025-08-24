package com.expense_reimbursement.expense.Services;

import com.expense_reimbursement.expense.dto.RegisterRequest;
import com.expense_reimbursement.expense.entities.User;
import com.expense_reimbursement.expense.repository.UserRepository; // use .repository if that's your package
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    public User register(RegisterRequest r) {
        if (users.existsByEmail(r.email)) {
            throw new IllegalArgumentException("Email already in use");
        }
        User u = new User();
        u.setEmail(r.email);
        u.setPasswordHash(encoder.encode(r.password));
        u.setName(r.name);
        u.setRole(r.role != null ? r.role : User.Role.EMPLOYEE);
        u.setDepartment(r.department);
        //
        u.setCreatedAt(LocalDateTime.now());

        if (u.getRole().equals(User.Role.EMPLOYEE))
        {
            if (users.existsUserIdByDepartmentAndRole(u.getDepartment(), User.Role.MANAGER))
            {
                u.setManager(users.findUserByDepartmentAndRole(u.getDepartment(), User.Role.MANAGER));
            }
            else
            {
                u.setRole(User.Role.MANAGER);
            }
        }

        return users.save(u);
    }
}
