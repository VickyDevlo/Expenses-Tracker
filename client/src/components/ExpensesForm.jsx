import React, { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";

const ExpensesForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const { addExpenses } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("All fields required");
    const newExpenses = {
      id: Date.now(),
      title,
      amount,
    };
    addExpenses(newExpenses);
    setTitle("");
    setAmount("");
    inputRef.current.focus();
  };

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
        className="bg-green-800 text-xl text-white px-4 py-0.5 rounded-sm cursor-pointer
      hover:bg-green-700 transition-colors duration-300"
      >
        +
      </button>
    </form>
  );
};

export default ExpensesForm;
