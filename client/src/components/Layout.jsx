import { FaRegTrashAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const { expenses } = useAppContext();
  const navigate = useNavigate();

  const totalAmount = expenses.reduce((sum, item) => {
    const amount = Number(item.amount);
    return sum + amount;
  }, 0);

  return (
    <div
      className="bg-white  w-full max-w-[550px] md:max-w-[600px] lg:max-w-[700px] max-h-[422px] mt-3 mx-auto px-3 sm:px-4 md:px-6 overflow-hidden p-3 sm:p-4 md:p-6 rounded-md shadow-2xl flex flex-col"
    >
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/deleted-expenses")}
          className="cursor-pointer p-1 hover:scale-110 hover:text-red-600 transition-all"
        >
          <FaRegTrashAlt size={20} />
        </button>
      </div>
      <div className="sticky top-0 bg-white z-10">
        <h1 className="mt-2 mb-4 text-xl md:text-3xl font-medium text-center">
          💰 Expenses Tracker
        </h1>
        <ExpensesForm />
      </div>

      <div className="flex-1 flex flex-col gap-2 mt-1 overflow-y-auto pr-1 custom-scrollbar">
        <ExpensesList />
      </div>
      {expenses.length ? (
        <p className="text-gray-600 text-end text-xs md:text-base mt-3 font-bold tracking-wide pr-4">
          Total : ₹ {parseFloat(totalAmount).toFixed(2)}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Layout;
