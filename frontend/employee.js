import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [currentSection, setCurrentSection] = useState("login");

  // Login/Register states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Expense states
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);

  const showSection = (section) => setCurrentSection(section);

  const register = () => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!regName || !emailRegex.test(regEmail) || regPassword.length < 6) {
      alert("Please enter valid details.");
      return;
    }
    setUsers([...users, { name: regName, email: regEmail, password: regPassword }]);
    alert("Registration successful! Please login.");
    showSection("login");
  };

  const login = () => {
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      alert("Login successful!");
      showSection("menu");
    } else {
      alert("Invalid credentials.");
    }
  };

  const logout = () => showSection("login");

  const addExpense = () => {
    if (!category || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }
    if (receipt && receipt.size > 5 * 1024 * 1024) {
      alert("Receipt file is too large (max 5MB).");
      return;
    }

    setExpenses([
      ...expenses,
      {
        category,
        amount,
        date,
        status: "Pending",
        note: description,
        receiptName: receipt ? receipt.name : "",
      },
    ]);

    alert("Expense added successfully!");
    showSection("viewExpenses");

    setCategory(""); setAmount(""); setDate(""); setDescription(""); setReceipt(null);
  };

  return (
    <div>
      <header>
        <h1>Expense Tracker</h1>
        {currentSection !== "login" && currentSection !== "register" && (
          <nav>
            <a onClick={() => showSection("menu")}>Menu</a>
            <a onClick={logout}>Logout</a>
          </nav>
        )}
      </header>

      {/* Login */}
      {currentSection === "login" && (
        <div className="container">
          <h2>Login</h2>
          <input type="email" placeholder="Email *" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
          <input type="password" placeholder="Password *" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          <button onClick={login}>Login</button>
          <p>Don't have an account? <a onClick={() => showSection("register")}>Register</a></p>
        </div>
      )}

      {/* Register */}
      {currentSection === "register" && (
        <div className="container">
          <h2>Register</h2>
          <input type="text" placeholder="Full Name *" value={regName} onChange={e => setRegName(e.target.value)} />
          <input type="email" placeholder="Email *" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
          <input type="password" placeholder="Password *" value={regPassword} onChange={e => setRegPassword(e.target.value)} />
          <button onClick={register}>Register</button>
          <p>Already have an account? <a onClick={() => showSection("login")}>Login</a></p>
        </div>
      )}

      {/* Menu */}
      {currentSection === "menu" && (
        <div className="container">
          <h2>Choose an option</h2>
          <div className="menu">
            <button onClick={() => showSection("addExpense")}>Add an Expense</button>
            <button onClick={() => showSection("viewExpenses")}>View Submitted Expenses</button>
          </div>
        </div>
      )}

      {/* Add Expense */}
      {currentSection === "addExpense" && (
        <div className="container">
          <h2>Add Expense</h2>
          <input type="text" placeholder="Category *" value={category} onChange={e => setCategory(e.target.value)} />
          <input type="number" placeholder="Amount *" value={amount} onChange={e => setAmount(e.target.value)} />
          <input type="date" value={date} max={new Date().toISOString().split("T")[0]} onChange={e => setDate(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <input type="file" onChange={e => setReceipt(e.target.files[0])} />
          <button onClick={addExpense}>Submit Expense</button>
        </div>
      )}

      {/* View Expenses */}
      {currentSection === "viewExpenses" && (
        <div className="container">
          <h2>Submitted Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Note</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{exp.category}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.date}</td>
                  <td>{exp.status}</td>
                  <td>{exp.note}</td>
                  <td>{exp.receiptName || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
