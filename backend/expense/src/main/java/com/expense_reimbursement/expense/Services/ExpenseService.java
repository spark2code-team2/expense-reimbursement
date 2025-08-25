package com.expense_reimbursement.expense.Services;

import com.expense_reimbursement.expense.dto.ExpenseRequestObject;
import com.expense_reimbursement.expense.entities.Expense;
import com.expense_reimbursement.expense.exception.employeeNotFoundException;
import com.expense_reimbursement.expense.exception.expenseAlreadyReviwedException;
import com.expense_reimbursement.expense.exception.expenseNotFoundException;
import com.expense_reimbursement.expense.repository.ExpenseRepository;
import com.expense_reimbursement.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.expense_reimbursement.expense.entities.Expense.Status.*;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MappingServices  mappingServices;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public void addExpense(Expense expense, long employeeId) throws employeeNotFoundException {
        if(userRepository.existsById(employeeId))
        {
            expense.setUser(userRepository.getById(employeeId));
            expense.setStatus(PENDING);
            expense.setCreatedAt(LocalDateTime.now());
            expenseRepository.save(expense);
        }
        else
        {
            throw new employeeNotFoundException("employee not found with id : " + employeeId);
        }
    }

    public void editExpense(Expense expense) throws Exception
    {
        if (expense.getStatus().equals(APPROVED) || expense.getStatus().equals(REJECTED))
        {
            throw new expenseAlreadyReviwedException("expense id :" + expense.getId() + " already reviewed no changes can be done");
        }
        if(!(userRepository.existsById(expense.getUser().getId())))
        {
            throw new employeeNotFoundException("user not found with id : " + expense.getUser().getId());
        }
        if(!(expenseRepository.existsById(expense.getUser().getId())))
        {
            throw new expenseNotFoundException("expense not found with id : " + expense.getId());
        }

         expenseRepository.save(expense);
    }

    public void deleteExpense(long id) throws Exception
    {
        Expense expense = expenseRepository.getById(id);

        if (expense.getStatus().equals(APPROVED) || expense.getStatus().equals(REJECTED))
        {
            throw new expenseAlreadyReviwedException("expense id :" + expense.getId() + " already reviewed no changes can be done");
        }
        expenseRepository.deleteById(id);
    }

    public List<ExpenseRequestObject> getExpenseList(Long userId) throws Exception {
        if(!(userRepository.existsById(userId)))
        {

            throw new employeeNotFoundException("user not found with id : " + userId);
        }
        List <ExpenseRequestObject> expenses =  new ArrayList<>();

        for (Expense expense : expenseRepository.findAllByUserId(userId))
        {
            expenses.add(mappingServices.getExpense(expense));
        }
        return expenses;
    }

    public String uploadFile(MultipartFile file) throws IOException
    {
        if (file == null || file.isEmpty())
        {
            throw  new IllegalArgumentException("the file is empty or is null");
        }

        File directory = new File(uploadDir);
        if (!directory.exists() && !directory.mkdirs()) {
            throw new IOException( "creating File Failed" + uploadDir);
        }


        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFileName = System.currentTimeMillis() + fileExtension;
        Path filePath = Paths.get(uploadDir + uniqueFileName);

        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new IOException("uploading file failed" + e.getMessage());
        }

        return uploadDir + uniqueFileName;
    }


    public List<Expense> getAllExpenses()
    {
        List <Expense> expensesList =  expenseRepository.findAll();
        return  expensesList;
    }

}
