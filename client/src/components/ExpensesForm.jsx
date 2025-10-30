import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { RiAddFill, RiRefreshLine } from "react-icons/ri";

const ExpensesForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const inputRef = useRef();
  const { saveExpenses, editingExpense, setEditingExpense } = useAppContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("All fields required");

    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      title,
      amount: parseFloat(amount).toFixed(2),
    };

    if (editingExpense) {
      saveExpenses(newExpense, "update");
    } else {
      saveExpenses(newExpense, "add");
    }
    setTitle("");
    setAmount("");
    setEditingExpense(null);
    inputRef.current.focus();
  };

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

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-wrap max-md:flex-col items-center gap-3 my-3"
    >
      <input
        type="text"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expenses title"
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none capitalize max-md:w-full"
      />
      <input
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*\.?\d*$/.test(val)) {
            setAmount(val);
          }
        }}
        placeholder="₹ amount"
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none capitalize max-md:w-full"
      />

      <button
        type="submit"
        className="bg-green-800 text-xl text-white px-4 py-0.5 rounded-sm cursor-pointer flex items-center justify-center gap-2
      hover:bg-green-700 transition-colors duration-300"
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
