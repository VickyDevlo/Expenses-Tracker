import { useAppContext } from "../context/AppContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { Modal } from "../shared/Modal";
import { useState } from "react";

const ExpensesItem = ({ expense }) => {
  const [open, setOpen] = useState(false);
  const { id, title, amount } = expense;
  const { deleteExpenses, setEditingExpense } = useAppContext();

  return (
    <>
      <div
        className="flex items-center justify-between max-md:gap-2 py-1.5 md:py-2 px-1.5 md:px-3 bg-gray-200 rounded max-md:text-[13px] text-base font-semibold"
      >
        <h2 className="max-md:w-25 w-35 truncate capitalize">{title}</h2>
        <span className="">₹ {amount}</span>
        <div className="flex items-center max-md:gap-1 gap-3">
          <button
            onClick={() => setEditingExpense(expense)}
            className="text-sm text-white cursor-pointer"
          >
            <GrEdit size={20}
              className="text-base text-blue-500 hover:scale-125 
            transition-all duration-300"
            />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="text-sm text-white cursor-pointer"
          >
            <RiDeleteBin6Line
            size={20}
              className="text-base text-[#e81f54] 
            hover:scale-125 transition-all duration-300"
            />
          </button>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Are you sure?</h2>
          <p className="text-sm text-center text-[#666666] mt-2">
            You want to remove this record from your expenses?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-10 items-center">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-1 text-gray-700 border
               border-gray-400 hover:bg-gray-100 font-medium rounded 
               cursor-pointer transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteExpenses(id)}
              className="px-4 py-1 text-white flex justify-center items-center 
              gap-4 bg-[#792e42] hover:bg-[#923850] border-0 outline-none
              rounded cursor-pointer transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExpensesItem;
