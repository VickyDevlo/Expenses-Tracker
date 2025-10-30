import { useAppContext } from "../context/AppContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { Modal } from "../shared/Modal";
import { useState } from "react";

const ExpensesItem = ({ expense }) => {
  const { id, title, amount } = expense;
  const { deleteExpenses, setEditingExpense } = useAppContext();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
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
            onClick={() => setDeleteOpen(true)}
            className="text-sm text-white cursor-pointer"
          >
            <RiDeleteBin6Line size={18} color="red" />
          </button>
        </div>
      </div>
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Are you sure?</h2>
          <p className="text-sm text-center text-[#666666] mt-2">
            You want to remove this record from your expenses?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-10 items-center">
            <button
              onClick={() => setDeleteOpen(false)}
              className="px-4 py-1 text-gray-700 border
               border-gray-400 hover:bg-gray-100 font-medium rounded 
               cursor-pointer transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteExpenses(id)}
              className="px-4 py-1 text-white flex justify-center items-center 
              gap-4 bg-[#d36482] hover:bg-[#df5479] border-0 outline-none
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
