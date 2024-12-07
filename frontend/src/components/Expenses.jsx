import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components for Expenses Page
const ExpensesContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Textarea = styled.textarea`
  grid-column: span 2;
  resize: none;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  grid-column: span 2;
  padding: 10px;
  font-size: 18px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Expenses = () => {
  const [expense, setExpense] = useState({ date: "", category: "", amount: "", note: "" });

  const addExpense = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/expenses", expense);
      alert(response.data.message);
      setExpense({ date: "", category: "", amount: "", note: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ExpensesContainer>
      <h2>Add Expense</h2>
      <Form>
        <Input
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Category"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        />
        <Textarea
          placeholder="Note"
          value={expense.note}
          onChange={(e) => setExpense({ ...expense, note: e.target.value })}
        ></Textarea>
        <Button onClick={addExpense}>Add Expense</Button>
      </Form>
    </ExpensesContainer>
  );
};

export default Expenses;
