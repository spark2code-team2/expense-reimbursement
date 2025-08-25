package com.expense_reimbursement.expense.repository;

import com.expense_reimbursement.expense.entities.ChooseRole;
import com.expense_reimbursement.expense.entities.User;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    User findUserByDepartmentAndRole(String Department, User.Role Role);
    List<User> findAllByRole(User.Role Role);
    boolean existsByDepartmentAndRole(String Department, User.Role Role);
    boolean existsUserIdByDepartmentAndRole(String Department, User.Role Role);
    User findUserByManagerId(long ManagerId);
    List<User> findAllUserByManagerId(long ManagerId);
    User findUserById(long Id);

//    List<User> findAllByChooseRole(User.Role Role);
}
