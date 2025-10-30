import { CgClose } from "react-icons/cg";

export const Modal = ({ open, onClose, className = "", children }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center px-3
       z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white shadow-lg pb-5 rounded-md`}
      >
        <div className="flex items-start justify-end px-2 pt-3">
          <button onClick={onClose} className="font-semibold cursor-pointer">
            <CgClose size={20}  />
          </button>
        </div>
        <div className={`px-8 ${className}`}>{children}</div>
      </div>
    </div>
  );
};
