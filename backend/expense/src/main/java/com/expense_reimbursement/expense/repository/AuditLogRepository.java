package com.expense_reimbursement.expense.repository;

import com.expense_reimbursement.expense.entities.AuditLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogRepository extends CrudRepository<AuditLog, Long> {

}
