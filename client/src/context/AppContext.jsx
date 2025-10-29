import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const addExpenses = (expense) => {
    setExpenses((prev) => [...prev, expense]);
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
    deleteExpenses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
