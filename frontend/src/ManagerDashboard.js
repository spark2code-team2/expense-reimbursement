import React from "react";

function ManagerDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#4CB0AF" }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Manager Dashboard 
        </h1>

        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Employee</th>
              <th className="p-3 border">Expense Type</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-3 border">John Doe</td>
              <td className="p-3 border">Travel</td>
              <td className="p-3 border">$200</td>
              <td className="p-3 border text-yellow-600">Pending</td>
              <td className="p-3 border">
                <button className="px-3 py-1 bg-green-500 text-white rounded-lg mr-2">Approve</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg">Reject</button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="p-3 border">Jane Smith</td>
              <td className="p-3 border">Meals</td>
              <td className="p-3 border">$50</td>
              <td className="p-3 border text-green-600">Approved</td>
              <td className="p-3 border">—</td>
            </tr>
            <tr className="text-center">
              <td className="p-3 border">Mike Johnson</td>
              <td className="p-3 border">Supplies</td>
              <td className="p-3 border">$120</td>
              <td className="p-3 border text-red-600">Rejected</td>
              <td className="p-3 border">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerDashboard;

