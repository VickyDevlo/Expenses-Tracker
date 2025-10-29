import { useAppContext } from "../context/AppContext";

const ExpensesItem = ({ expense }) => {
  const { id, title, amount } = expense;
  const { deleteExpenses } = useAppContext();

  return (
    <div className="flex items-center justify-between max-md:gap-2 py-2 px-3 bg-gray-200 rounded shadow mt-2 max-md:text-[13px] text-base font-semibold">
      <h2 className="max-md:w-25 w-35 truncate capitalize">{title}</h2>
      <span className="">₹{amount}</span>
      <button
        onClick={() => deleteExpenses(id)}
        className="bg-red-800 text-sm text-white px-4 py-0.5 rounded-sm cursor-pointer  hover:bg-red-700 transition-colors duration-300"
      >
        🗑
      </button>
    </div>
  );
};

export default ExpensesItem;
