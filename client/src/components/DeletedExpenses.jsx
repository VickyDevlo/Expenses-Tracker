import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { IoMdArrowBack } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import { Modal } from "../shared/Modal";

const DeleteExpenses = () => {
  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const { deletedExpenses, setDeletedExpenses } = useAppContext();
  const navigate = useNavigate();

  const removeData = (id) => {
    setDeletedExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div
        className="bg-red-50 w-full max-w-[550px] md:max-w-[600px] lg:max-w-[700px] max-h-[422px] mt-3 mx-auto px-3 sm:px-4 md:px-6 overflow-hidden p-3 sm:p-4 md:p-6 rounded-md shadow-2xl flex flex-col"
      >
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer p-1 hover:text-gray-500 hover:-translate-x-1 transition-all duration-300"
          >
            <IoMdArrowBack size={18} />
          </button>
        </div>
        <h1
          className=" text-xl md:text-3xl font-medium text-center text-red-700
         tracking-wider mb-2"
        >
          Deleted Expenses
        </h1>
        <ul className="space-y-3">
          {deletedExpenses.length ? (
            deletedExpenses.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between max-md:gap-2 py-1.5 md:py-2 px-1.5 md:px-3 bg-gray-200 rounded max-md:text-[13px] 
              text-base font-semibold"
              >
                <p className="font-semibold text-gray-800 capitalize">
                  {item.title || "Untitled Expense"}
                </p>
                <p className="text-gray-600 text-sm">₹{item.amount}</p>

                <button
                  onClick={() => {
                    setOpen(true);
                    setDeletedId(item.id);
                  }}
                  className="cursor-pointer"
                >
                  <AiTwotoneDelete size={20} color="red" />
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              No expenses deleted yet!
            </p>
          )}
        </ul>
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
              className="px-4 py-1 text-gray-700 border
                   border-gray-400 hover:bg-gray-100 font-medium rounded 
                   cursor-pointer transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                removeData(deletedId);
                setOpen(false);
              }}
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

export default DeleteExpenses;
