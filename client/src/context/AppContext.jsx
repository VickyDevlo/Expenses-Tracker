import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingExpense, setEditingExpense] = useState(null);

  // Add New Expenses
  const addExpenses = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // Update Selected Expenses
  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      )
    );
    setEditingExpense(null);
  };

  // Delete Selected Expenses
  const deleteExpenses = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // Set Expenses In LocalStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const value = {
    expenses,
    setExpenses,
    editingExpense,
    setEditingExpense,
    addExpenses,
    updateExpense,
    deleteExpenses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
