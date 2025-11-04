import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal } from "../shared/Modal";
import { useAppContext } from "../context/AppContext";

const DeletedExpenseItem = ({ deletedExpense }) => {
  const [open, setOpen] = useState(false);
  const { setDeletedExpenses } = useAppContext();

  const { title, amount } = deletedExpense;

  const removeData = (id) => {
    setDeletedExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000;
    const timer = setTimeout(() => {
      removeData(deletedExpense.id);
    }, TWO_DAYS_IN_MS);

    return () => clearTimeout(timer);
  }, [deletedExpense.id]);

  return (
    <div
      className="flex flex-col md:flex-row md:items-center md:justify-between 
      bg-red-200 rounded py-2 px-3 md:py-2 md:px-4 max-md:text-[13px] text-base font-semibold gap-1"
    >
      <div className="flex items-center w-full justify-between gap-3">
         <h2 className="max-md:w-25 w-35 truncate capitalize">{title}</h2>
        <span>₹ {amount}</span>
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer hover:text-red-800 transition-colors"
        >
          <RiDeleteBin6Line size={22} />
        </button>
      </div>

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
