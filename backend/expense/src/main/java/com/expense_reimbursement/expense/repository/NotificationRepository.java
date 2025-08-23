package com.expense_reimbursement.expense.repository;

import com.expense_reimbursement.expense.entities.Notification;
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
}
