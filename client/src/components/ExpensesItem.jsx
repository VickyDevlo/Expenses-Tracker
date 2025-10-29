import { useAppContext } from "../context/AppContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const ExpensesItem = ({ expense }) => {
  const { id, title, amount } = expense;
  const { deleteExpenses, setEditingExpense } = useAppContext();

  return (
    <div className="flex items-center justify-between max-md:gap-2 py-2 px-3 bg-gray-200 rounded mt-2 max-md:text-[13px] text-base font-semibold">
      <h2 className="max-md:w-25 w-35 truncate capitalize">{title}</h2>
      <span className="">₹{amount}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setEditingExpense(expense)}
          className="text-sm text-white cursor-pointer"
        >
          <GrEdit size={18} color="black" />
        </button>
        <button
          onClick={() => deleteExpenses(id)}
          className="text-sm text-white cursor-pointer"
        >
          <RiDeleteBin6Line size={18} color="red" />
        </button>
      </div>
    </div>
  );
};

export default ExpensesItem;
