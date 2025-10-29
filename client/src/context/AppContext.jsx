import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingExpense, setEditingExpense] = useState(null);

  const addExpenses = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };
    const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === updatedExpense.id ? updatedExpense : item))
    );
    setEditingExpense(null);
  };


  const deleteExpenses = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const value = {
    expenses,
    setExpenses,
    addExpenses,
    editingExpense,
    setEditingExpense,
    updateExpense,
    deleteExpenses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
