import { useAppContext } from "../context/AppContext";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";

const Layout = () => {
  const { expenses } = useAppContext();

  const totalAmount = expenses.reduce((sum, item) => {
    const amount = Number(item.amount);
    return sum + amount;
  }, 0);

  return (
    <div
      className="bg-white lg:w-[550px] max-h-[422px] mt-3 mx-3 md:mx-auto 
    overflow-hidden p-4 sm:p-6 rounded-md shadow-2xl flex flex-col"
    >
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
