import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingExpense, setEditingExpense] = useState(null);

  // Add New / Update Expenses
  const saveExpenses = (expense, action) => {
    if (!expense || !action) return;
    setExpenses((prev) => {
      if (action === "add") {
        return [expense, ...prev];
      }
      if (action === "update") {
        return prev.map((item) => (item.id === expense.id ? expense : item));
      }
      return prev;
    });
    setEditingExpense(null);
  };

  // Delete Selected Expenses
  const deleteExpenses = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    setEditingExpense((current) =>
      current && current.id === id ? null : current
    );
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
    saveExpenses,
    deleteExpenses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
