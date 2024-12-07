import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled components for the page layout
const HomeContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

const Header = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: 'Arial', sans-serif;
  transition: color 0.3s ease;
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? "#18bc9c" : "#bdc3c7")};
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 15px;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#16a085" : "#95a5a6")};
    transform: translateY(-2px);
  }
`;

const Section = styled.div`
  margin-top: 20px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Input = styled.input`
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #bdc3c7;
  width: 80%;
  max-width: 400px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #18bc9c;
    box-shadow: 0 0 5px rgba(24, 188, 156, 0.5);
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #bdc3c7;
  width: 80%;
  max-width: 400px;
  font-size: 16px;
  height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #18bc9c;
    box-shadow: 0 0 5px rgba(24, 188, 156, 0.5);
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const Button = styled.button`
  background-color: #18bc9c;
  color: white;
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 18px;
  transition: all 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16a085;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: #2ecc71;
  font-size: 14px;
  margin-top: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 450px;
  margin: 0 auto;
`;

// Income Section
const IncomeSection = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addIncome = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid income amount.");
      setSuccess("");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/income", { amount });
      setSuccess(response.data.message);
      setError("");
      setAmount("");
    } catch (error) {
      setError("Failed to add income. Please try again.");
      setSuccess("");
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <h2>Add Income</h2>
      <Input
        type="number"
        placeholder="Income Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={addIncome}>Add Income</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </FormContainer>
  );
};

// Expenses Section
const ExpensesSection = () => {
  const [expense, setExpense] = useState({ date: "", category: "", amount: "", note: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addExpense = async () => {
    if (!expense.amount || !expense.category || expense.amount <= 0) {
      setError("Please fill out all fields correctly.");
      setSuccess("");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/expenses", expense);
      setSuccess(response.data.message);
      setError("");
      setExpense({ date: "", category: "", amount: "", note: "" });
    } catch (error) {
      setError("Failed to add expense. Please try again.");
      setSuccess("");
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <h2>Add Expense</h2>
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
      <TextArea
        placeholder="Note"
        value={expense.note}
        onChange={(e) => setExpense({ ...expense, note: e.target.value })}
      />
      <Button onClick={addExpense}>Add Expense</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </FormContainer>
  );
};

// Main Home Page Component
const Home = () => {
  const [activeTab, setActiveTab] = useState("income");

  return (
    <HomeContainer>
      <Header>Income and Expenses Tracker</Header>
      <ToggleButtonContainer>
        <ToggleButton
          active={activeTab === "income"}
          onClick={() => setActiveTab("income")}
        >
          Income
        </ToggleButton>
        <ToggleButton
          active={activeTab === "expenses"}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </ToggleButton>
      </ToggleButtonContainer>

      {/* Income Section */}
      <Section show={activeTab === "income"}>
        <IncomeSection />
      </Section>

      {/* Expenses Section */}
      <Section show={activeTab === "expenses"}>
        <ExpensesSection />
      </Section>
    </HomeContainer>
  );
};

export default Home;
