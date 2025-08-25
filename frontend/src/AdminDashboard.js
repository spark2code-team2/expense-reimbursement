import React, { useState, useEffect, useRef } from 'react';
import { getExpenses, exportExpensesCSV } from './services/api';


const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const editMenuRef = useRef(null);
  const editBtnRef = useRef(null);
  const filterMenuRef = useRef(null);
  const filterBtnRef = useRef(null);
  const exportMenuRef = useRef(null);
  const exportBtnRef = useRef(null);

  const seedData = [
    { 
      id: 1, 
      userId: 101,
      name: 'John Doe',
      title: 'Coffee Meeting',
      amount: 1.5, 
      dateIncurred: '2025-07-19', 
      description: 'Client meeting over coffee',
      status: 'PENDING'
    },
    { 
      id: 2, 
      userId: 102,
      name: 'Jane Smith',
      title: 'Business Travel',
      amount: 12, 
      dateIncurred: '2025-07-20', 
      description: 'Taxi to client meeting',
      status: 'APPROVED'
    },
    { 
      id: 3, 
      userId: 103,
      name: 'Bob Johnson',
      title: 'Office Supplies',
      amount: 25, 
      dateIncurred: '2025-07-21', 
      description: 'Printer paper and pens',
      status: 'REJECTED'
    },
    { 
      id: 4, 
      userId: 104,
      name: 'Alice Brown',
      title: 'Parking Fee',
      amount: 8, 
      dateIncurred: '2025-07-22', 
      description: 'Parking at client location',
      status: 'PENDING'
    }
  ];

  useEffect(() => {
  getExpenses()
    .then(res => {
      setRequests(res.data);
      setFilteredRequests(res.data);
    })
    .catch(err => {
      console.error("Error fetching expenses:", err);
      // Optionally show a toast or alert
    });
}, []);


  useEffect(() => {
    let filtered = requests;
    
    if (statusFilter) {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter(r => r.dateIncurred === dateFilter);
    }
    
    setFilteredRequests(filtered);
  }, [requests, statusFilter, dateFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editMenuRef.current && 
          !editMenuRef.current.contains(event.target) && 
          !editBtnRef.current.contains(event.target)) {
        setShowEditMenu(false);
      }
      if (filterMenuRef.current && 
          !filterMenuRef.current.contains(event.target) && 
          !filterBtnRef.current.contains(event.target)) {
        setShowFilters(false);
      }
      if (exportMenuRef.current && 
          !exportMenuRef.current.contains(event.target) && 
          !exportBtnRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const viewReceipt = (description) => {
    setSelectedReceipt(description);
    setShowReceiptDialog(true);
  };

  const exportToCSV = () => {
  exportExpensesCSV()
    .then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses-export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(err => console.error("Error exporting CSV:", err));
};


  const addUser = () => alert('Add User functionality - Create user management page');
  const editUser = () => alert('Edit User functionality - Modify existing users');
  const deleteUser = () => alert('Delete User functionality - Remove users');

  const StatusBadge = ({ status }) => (
    <span className={`badge ${status.toLowerCase()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div style={{ 
      margin: 0, 
      fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial', 
      background: '#ffffff', 
      color: '#222',
      minHeight: '100vh' 
    }}>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 16px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          position: relative;
          flex-wrap: wrap;
          gap: 16px;
        }
        .toolbar {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        select.btn.small, input.btn.small {
          background: #fff;
          border: 1px solid #ccc;
          color: 'transparent';
          border-radius: 8px;
        }
        select.btn.small:focus, input.btn.small:focus {
          outline: none;
          border-color: #4cb0af;
        }
        .title {
          font-size: 20px;
          margin: 0;
          color: #4cb0af;
        }
        .btn {
          border: none;
          cursor: pointer;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 14px;
          transition: background 0.2s ease, color 0.2s ease;
          margin-left: 8px;
        }
        .btn.primary {
          background: #4cb0af;
          color: #fff;
        }
        .btn.primary:hover {
          background: #3aa2a1;
        }
        .btn.secondary {
          background: #fff;
          color: #4cb0af;
          border: 1px solid #4cb0af;
        }
        .btn.secondary:hover {
          background: #f2fdfd;
        }
        .btn.danger {
          background: #ff6b6b;
          color: #fff;
        }
        .btn.small {
          padding: 4px 10px;
          font-size: 13px;
          margin: 2px;
        }
        .card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 12px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, .05);
        }
        .table-wrap {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 12px 14px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        th {
          background: #f9f9f9;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .05em;
          color: #555;
        }
        tr:hover td {
          background: #f2fdfd;
        }
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        .badge.approved {
          background: #d1fae5;
          color: #065f46;
        }
        .badge.pending {
          background: #fef3c7;
          color: #92400e;
        }
        .badge.rejected {
          background: #fee2e2;
          color: #991b1b;
        }
        .empty {
          padding: 20px;
          text-align: center;
          color: #777;
        }
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
          z-index: 10;
          min-width: 180px;
          padding: 8px;
        }
        .dropdown-menu button {
          display: block;
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          padding: 8px 14px;
          cursor: pointer;
          border-radius: 4px;
        }
        .dropdown-menu button.danger {
          color: #ff6b6b;
        }
        .dropdown-menu button:hover {
          background: #f2fdfd;
        }
        .filter-group {
          margin-bottom: 12px;
        }
        .filter-group label {
          display: block;
          margin-bottom: 4px;
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }
        .filter-buttons {
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px solid #eee;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, .5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          max-width: 500px;
          width: 90%;
        }
        .button-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }
      `}</style>

      <div className="container">
        <header className="header">
          <h1 className="title">Expense Management Dashboard</h1>
          <div className="button-group">
            {/* User Management Dropdown */}
            <div className="dropdown">
              <button 
                ref={editBtnRef}
                className="btn primary" 
                onClick={() => setShowEditMenu(!showEditMenu)}
              >
                User Management ▼
              </button>
              {showEditMenu && (
                <div ref={editMenuRef} className="dropdown-menu">
                  <button onClick={addUser}>Add User</button>
                  <button onClick={editUser}>Edit User</button>
                  <button className="danger" onClick={deleteUser}>Delete User</button>
                </div>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="dropdown">
              <button 
                ref={filterBtnRef}
                className="btn primary" 
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter ▼
              </button>
              {showFilters && (
                <div ref={filterMenuRef} className="dropdown-menu">
                  <div className="filter-group">
                    <label>Status:</label>
                    <select 
                      className="btn small"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{width: '100%'}}
                    >
                      <option value="">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Date Incurred:</label>
                    <input 
                      type="date" 
                      className="btn small"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      style={{width: '100%'}}
                    />
                  </div>
                  
                  <div className="filter-buttons">
                    <button className="btn small secondary" onClick={() => {
                      setStatusFilter('');
                      setDateFilter('');
                    }}>Clear All</button>
                  </div>
                </div>
              )}
            </div>

            {/* Export Dropdown */}
            <div className="dropdown">
              <button 
                ref={exportBtnRef}
                className="btn primary" 
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                Export ▼
              </button>
              {showExportMenu && (
                <div ref={exportMenuRef} className="dropdown-menu">
                  <button onClick={exportToCSV}>Export to CSV</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Expense ID</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="empty">No expenses found.</td>
                  </tr>
                ) : (
                  filteredRequests.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.id}</td>
                      <td>{expense.userId}</td>
                      <td>{expense.name}</td>
                      <td>{expense.title}</td>
                      <td>{expense.amount}</td>
                      <td>{formatDate(expense.dateIncurred)}</td>
                      <td><StatusBadge status={expense.status} /></td>
                      <td>{expense.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Receipt Dialog */}
      {showReceiptDialog && (
        <div className="modal" onClick={() => setShowReceiptDialog(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Expense Description</h3>
            <p>{selectedReceipt}</p>
            <button 
              className="btn secondary" 
              onClick={() => setShowReceiptDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;