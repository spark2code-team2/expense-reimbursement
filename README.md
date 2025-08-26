
## Expense Reimbursement System (MVP)
Is A simple MVP system that for managing employee submission expenses , and the manager could approve / reject the form , the admin could extract all the records in the system.


##  Tools
•	Backend: Spring Boot
•	Frontend: React
•	Database: MySQL
•	Testing: Postman

## Features
•	User registration in the system ( login / sign in ) for ( Employee/Manager/Admin)
•	Employee can Submit an Expense form with the file receipt 
•	Employee can view their Expenses 
•	Manager can view their employee expenses and approve/reject them
•	Admin access all the records and can extract them 


## installation and setup 
Clone the repository 
For backend ( cd backend)
1.	Open the application properties 
2.	Change the datasource.password  enter your own password
3.	Run the application  remember port 8080

For frontend ( cd frontend ) 
1.	Open the Frontend folder in Vs code
2.	Run in terminal npm start






## API endpoint 
1.	Authentication 
2.	Expenses 
For
## authentication ( request (/api/auth )
Post (/register)  registration for the user
Post (/login)  logging in for the user
Get 

For
## Expenses 
Post (employee/{employeeId}/addexpense)  for the employee to add an expense
Put (employee/{employeeId}/editexpense/{id})  for the employee to edit their expense
DELETE (employee/{employeeId}/delete_expense/{id})  for the employee to delete the expense 
Get (employee/{employeeId}/expenses)  for returning all the employee expenses

