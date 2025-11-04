import { useEffect, useRef, useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { RiAddFill, RiRefreshLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

const ExpensesForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const inputRef = useRef();
  const { saveExpenses, editingExpense, setEditingExpense } = useAppContext();

  // ✅ useCallback for performance optimization
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!title || !amount) return alert("All fields required");

      const newExpense = {
        id: editingExpense ? editingExpense.id : uuidv4(),
        title,
        amount: parseFloat(amount).toFixed(2),
      };

      if (editingExpense) {
        saveExpenses(newExpense, "update");
      } else {
        saveExpenses(newExpense, "add");
      }
      e.target.reset();

      setTitle("");
      setAmount("");
      setEditingExpense(null);
      inputRef.current.focus();
    },
    [title, amount, editingExpense, saveExpenses, setEditingExpense]
  );

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      inputRef.current.focus();
    } else {
      setTitle("");
      setAmount("");
    }
  }, [editingExpense]);

  const isdisabled = !title || !amount;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center flex-wrap max-md:flex-col items-center gap-3 my-3"
    >
      <input
        type="text"
        name="title"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expenses title"
        aria-label="Expense title"
        autoFocus
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none capitalize max-lg:w-full"
      />

      <input
        type="text"
        name="amount"
        inputMode="decimal"
        value={amount}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*\.?\d*$/.test(val)) setAmount(val);
        }}
        placeholder="₹ amount"
        aria-label="Expense amount"
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none capitalize max-lg:w-full"
      />

      <button
        type="submit"
        aria-label={editingExpense ? "Update expense" : "Add expense"}
        disabled={isdisabled}
        className={` text-xl text-white px-4 py-0.5 rounded-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
          isdisabled
            ? "cursor-not-allowed opacity-50 bg-gray-500"
            : "cursor-pointer bg-green-800 hover:bg-green-700"
        }`}
      >
        <span className="md:hidden">
          {editingExpense ? (
            <RiRefreshLine size={24} />
          ) : (
            <RiAddFill size={24} />
          )}
        </span>
        <span className="hidden md:inline text-sm py-0.5 font-medium tracking-wide">
          {editingExpense ? "Update" : "Add"}
        </span>
      </button>
    </form>
  );
};

export default ExpensesForm;
