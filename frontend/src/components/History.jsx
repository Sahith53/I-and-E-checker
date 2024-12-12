import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState({ income: [], expense: [] });
  const [formData, setFormData] = useState({ type: '', amount: '', description: '' });

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Separate income and expense entries
      const income = response.data.data.filter((entry) => entry.type === 'income');
      const expense = response.data.data.filter((entry) => entry.type === 'expense');

      setHistory({ income, expense });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/history', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ type: '', amount: '', description: '' });
      fetchHistory(); // Refresh history after adding
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto my-5">
      <h1 className="mb-5 text-2xl font-bold">Income and Expense History</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <select
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
          Add Entry
        </button>
      </form>

      {/* Income History */}
      <h2 className="mt-6 text-xl font-semibold">Income History</h2>
      <table className="w-full mt-2 mb-6 border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Date</th>
            <th className="px-4 py-2 border border-gray-300">Amount</th>
            <th className="px-4 py-2 border border-gray-300">Description</th>
          </tr>
        </thead>
        <tbody>
          {history.income.length > 0 ? (
            history.income.map((entry) => (
              <tr key={entry._id}>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">${entry.amount}</td>
                <td className="px-4 py-2 border border-gray-300">{entry.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center border border-gray-300" colSpan="3">
                No income records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Expense History */}
      <h2 className="mt-6 text-xl font-semibold">Expense History</h2>
      <table className="w-full mt-2 border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Date</th>
            <th className="px-4 py-2 border border-gray-300">Amount</th>
            <th className="px-4 py-2 border border-gray-300">Description</th>
          </tr>
        </thead>
        <tbody>
          {history.expense.length > 0 ? (
            history.expense.map((entry) => (
              <tr key={entry._id}>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">${entry.amount}</td>
                <td className="px-4 py-2 border border-gray-300">{entry.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center border border-gray-300" colSpan="3">
                No expense records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
