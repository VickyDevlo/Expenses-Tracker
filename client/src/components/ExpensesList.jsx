import ExpensesItem from "./ExpensesItem";
import { useAppContext } from "../context/AppContext";

const ExpensesList = () => {
  const { expenses } = useAppContext();

  return (
    <>
      {expenses?.length ? (
        expenses.map((expense) => (
          <ExpensesItem key={expense.id} expense={expense} />
        ))
      ) : (
        <p className="text-center text-gray-500">Nothing to show yet. Add your first expense!</p>
      )}
    </>
  );
};

export default ExpensesList;
