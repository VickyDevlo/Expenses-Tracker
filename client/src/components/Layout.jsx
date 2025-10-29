import { useAppContext } from "../context/AppContext";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";

const Layout = () => {
  const { expenses } = useAppContext();

  const totalAmount = expenses.reduce((sum, item) => {
    const amount = Number(item.amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div
      className="bg-white max-h-[410px] mt-3 overflow-hidden p-6 
    rounded-md shadow-2xl flex flex-col"
    >
      <div className="sticky top-0 bg-white z-10">
        <h1 className="mt-2 mb-4 text-xl md:text-3xl font-medium text-center">
          💰 Expense Tracker
        </h1>
        <ExpensesForm />
        {expenses.length ? (
          <p className="text-gray-800 text-start text-xs md:text-base mt-3 font-bold tracking-wide">
            Total Expenses: ₹{parseFloat(totalAmount).toFixed(2)}
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <ExpensesList />
      </div>
    </div>
  );
};

export default Layout;
