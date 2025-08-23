import React, { useState, useEffect, useRef } from 'react';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  const editMenuRef = useRef(null);
  const editBtnRef = useRef(null);
  const filterMenuRef = useRef(null);
  const filterBtnRef = useRef(null);

  const seedData = [
    { id: 1, amount: '1.5 OMR', date: '2025-07-19', receipt: 'Coffee receipt', status: 'pending', notes: '', department: 'Dept 1' },
    { id: 2, amount: '12 OMR', date: '2025-07-20', receipt: 'Taxi receipt', status: 'approved', notes: 'Travel expense', department: 'Dept 1' },
    { id: 3, amount: '25 OMR', date: '2025-07-21', receipt: 'Office supplies', status: 'rejected', notes: 'Not approved', department: 'Dept 2' },
    { id: 4, amount: '8 OMR', date: '2025-07-22', receipt: 'Parking fee', status: 'pending', notes: '', department: 'Dept 2' }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('ems_requests_v1');
    if (stored) {
      const data = JSON.parse(stored);
      setRequests(data);
      setFilteredRequests(data);
    } else {
      setRequests(seedData);
      setFilteredRequests(seedData);
      localStorage.setItem('ems_requests_v1', JSON.stringify(seedData));
    }
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem('ems_requests_v1', JSON.stringify(requests));
    }
  }, [requests]);

  useEffect(() => {
    let filtered = requests;
    
    if (departmentFilter) {
      filtered = filtered.filter(r => r.department === departmentFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter(r => r.date === dateFilter);
    }
    
    setFilteredRequests(filtered);
  }, [requests, departmentFilter, statusFilter, dateFilter]);

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateRequestStatus = (id, newStatus) => {
    setRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const viewReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    setShowReceiptDialog(true);
  };

  const exportToCSV = () => {
    const dataToExport = filteredRequests.length > 0 ? filteredRequests : requests;
    
    const headers = ['Request ID', 'Amount', 'Date', 'Receipt', 'Status', 'Notes', 'Department'];
    
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(request => [
        request.id,
        `"${request.amount}"`,
        request.date,
        `"${request.receipt}"`,
        request.status,
        `"${request.notes || ''}"`,
        `"${request.department || ''}"`
      ].join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const dataToExport = filteredRequests.length > 0 ? filteredRequests : requests;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const addUser = () => alert('Add User functionality - Create user management page');
  const editUser = () => alert('Edit User functionality - Modify existing users');
  const deleteUser = () => alert('Delete User functionality - Remove users');

  const StatusBadge = ({ status }) => (
    <span className={`badge ${status}`}>{status}</span>
  );

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
          max-width: 1000px;
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
          color: #333;
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
        .edit-menu {
          position: absolute;
          top: 36px;
          left: 0;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
          z-index: 10;
          min-width: 120px;
        }
        .edit-menu button {
          display: block;
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          padding: 8px 14px;
          cursor: pointer;
        }
        .edit-menu button.danger {
          color: #ff6b6b;
        }
        .edit-menu button:hover {
          background: #f2fdfd;
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
        .edit-dropdown {
          position: relative;
          display: inline-block;
        }
      `}</style>

      <div className="container">
        <header className="header">
          <h1 className="title">All Expenses</h1>
          <div className="button-group">
            {/* Task 1: User Management (Add/Edit/Delete) */}
            <div className="edit-dropdown">
              <button 
                ref={editBtnRef}
                className="btn primary" 
                onClick={() => setShowEditMenu(!showEditMenu)}
              >
                User Management ▼
              </button>
              {showEditMenu && (
                <div ref={editMenuRef} className="edit-menu">
                  <button onClick={addUser}>Add User</button>
                  <button onClick={editUser}>Edit User</button>
                  <button className="danger" onClick={deleteUser}>Delete User</button>
                </div>
              )}
            </div>

            {/* Task 2: Filters (Date, Department, Status) */}
            <div className="filter-dropdown">
              <button 
                ref={filterBtnRef}
                className="btn primary" 
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter ▼
              </button>
              {showFilters && (
                <div ref={filterMenuRef} className="filter-menu">
                  <div className="filter-group">
                    <label>Department:</label>
                    <select 
                      className="btn small" 
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      style={{width: '100%'}}
                    >
                      <option value="">All Departments</option>
                      <option value="Dept 1">Dept 1</option>
                      <option value="Dept 2">Dept 2</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Status:</label>
                    <select 
                      className="btn small"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{width: '100%'}}
                    >
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Date:</label>
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
                      setDepartmentFilter('');
                      setStatusFilter('');
                      setDateFilter('');
                    }}>Clear</button>
                  </div>
                </div>
              )}
            </div>

            {/* Task 3: Export to CSV/Excel */}
            <div className="export-dropdown">
              
              <div className="export-menu">
                <button onClick={exportToCSV}>Export to CSV</button>
                <button onClick={exportToExcel}>Export to Excel</button>
              </div>
            </div>
          </div>
        </header>

        <section className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Receipt</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">No requests found.</td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.amount}</td>
                      <td>{request.date}</td>
                      <td>
                        <button 
                          className="btn small secondary" 
                          onClick={() => viewReceipt(request.receipt)}
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <StatusBadge status={request.status} />
                        <br />
                        <button 
                          className="btn small primary" 
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn small danger" 
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </td>
                      <td>{request.notes || ''}</td>
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
            <h3>Receipt</h3>
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