import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { IoMdArrowBack } from "react-icons/io";
import DeletedExpenseItem from "./DeletedExpenseItem";

const DeleteExpenses = () => {
  const { deletedExpenses } = useAppContext();
  const navigate = useNavigate();

  return (
    <div
      className="bg-white w-full max-w-[550px] md:max-w-[600px] 
      lg:max-w-[700px] max-h-[422px] mt-3 mx-auto px-3 sm:px-4 md:px-6 overflow-hidden p-3 sm:p-4 md:p-6 rounded-md shadow-2xl flex flex-col"
    >
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer p-1 hover:text-gray-500 hover:-translate-x-1 transition-all duration-300"
        >
          <IoMdArrowBack size={18} />
        </button>
      </div>
      <h1 className="text-base md:text-3xl font-medium text-center text-red-900 mb-2">
        Recently Deleted
      </h1>

      {deletedExpenses?.length ? (
        <div className="flex-1 flex flex-col gap-2 mt-1 overflow-y-auto pr-2 custom-scrollbar">
          {deletedExpenses.map((exp) => (
            <DeletedExpenseItem key={exp.id} deletedExpense={exp} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Nothing to show yet. Add your first expense!
        </p>
      )}
      {deletedExpenses.length ? (
        <p className="text-center text-xs md:text-sm text-gray-500 mt-3 italic">
          All deleted expenses will be removed automatically after 2 days.
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default DeleteExpenses;
