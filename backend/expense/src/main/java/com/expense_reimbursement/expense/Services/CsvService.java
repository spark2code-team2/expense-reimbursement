package com.expense_reimbursement.expense.Services;

import com.expense_reimbursement.expense.entities.*;
import com.expense_reimbursement.expense.repository.UserRepository;
import com.opencsv.CSVWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.StringWriter;
import java.util.List;
import java.util.Optional;

@Service
public class CsvService {

    @Autowired
    private UserRepository userRepository;

    public String exportExpensesToCsv(List<Expense> expenses) {
        StringWriter stringWriter = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(stringWriter);


        // Write header
        String[] header = {"ID", "Employee Name", "Title", "Category", "Amount",
                "Currency", "Date Incurred", "Description", "Status", "Created At"};
        csvWriter.writeNext(header);

        // Write data
        for (Expense expense : expenses) {
            Optional<User> user = userRepository.findById(expense.getUser().getId());
            String employeeName = user.isPresent() ? user.get().getName() : "Unknown";

            String[] data = {
                    expense.getId().toString(),
                    employeeName,
                    expense.getTitle(),
                    expense.getCategory(),
                    expense.getAmount().toString(),
                    expense.getCurrency(),
                    expense.getDateIncurred().toString(),
                    expense.getDescription(),
                    expense.getStatus().toString(),
                    expense.getCreatedAt().toString()
            };
            csvWriter.writeNext(data);
        }

        try {
            csvWriter.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return stringWriter.toString();
    }

}
