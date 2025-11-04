import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // ✅ Initialize saved expenses
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Initialize deleted expenses
  const [deletedExpenses, setDeletedExpenses] = useState(() => {
    const deleteExp = localStorage.getItem("deleteExp");
    return deleteExp ? JSON.parse(deleteExp) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);

  // ✅ Add New / Update Expense
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

  // ✅ Delete Expense and store in deletedExpenses
  const deleteExpenses = (id) => {
    if (!id) return;

    setExpenses((prev) => {
      const toDelete = prev.find((item) => item.id === id);
      if (toDelete) {
        setDeletedExpenses((deletedPrev) => {
          
          const alreadyExists = deletedPrev.some(
            (item) => item.id === toDelete.id
          );
          if (alreadyExists) return deletedPrev;
          return [toDelete, ...deletedPrev];
        });
      }
      return prev.filter((item) => item.id !== id);
    });

    setEditingExpense((current) =>
      current && current.id === id ? null : current
    );
  };

  // ✅ Sync active expenses with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (err) {
      console.error("Failed to save expenses:", err);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem("deleteExp", JSON.stringify(deletedExpenses));
    } catch (err) {
      console.error("Failed to delete expenses:", err);
    }
  }, [deletedExpenses]);

  // ✅ Memoize context value for performance
  const value = useMemo(
    () => ({
      expenses,
      setExpenses,
      deletedExpenses,
      setDeletedExpenses,
      editingExpense,
      setEditingExpense,
      saveExpenses,
      deleteExpenses,
    }),
    [expenses, deletedExpenses, editingExpense]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
