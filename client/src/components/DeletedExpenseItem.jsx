import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { Modal } from "../shared/Modal";
import { useAppContext } from "../context/AppContext";
import { RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";

const DeletedExpenseItem = ({ deletedExpense }) => {
  const [open, setOpen] = useState(false);
  const { setDeletedExpenses } = useAppContext();

  const { title, amount } = deletedExpense;

  const removeData = (id) => {
    setDeletedExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className="flex items-center justify-between max-md:gap-2 py-1.5 md:py-2 px-1.5 md:px-3 bg-gray-200 rounded max-md:text-[13px] text-base 
      font-semibold"
    >
      <h2 className="max-md:w-25 w-35 truncate capitalize">{title}</h2>
      <span className="">₹ {amount}</span>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer hover:text-red-800 transition-colors"
      >
        <RiDeleteBin6Line size={22} />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Are you sure?</h2>
          <p className="text-sm text-center text-[#666666] mt-2">
            You want to permanently delete this expense?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-10 items-center">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-1 text-gray-700 border border-gray-400
               hover:bg-gray-100 font-medium rounded cursor-pointer 
               transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                removeData(deletedExpense.id);
                setOpen(false);
              }}
              className="px-4 py-1 text-white bg-[#792e42] 
              hover:bg-[#923850] rounded cursor-pointer transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeletedExpenseItem;
