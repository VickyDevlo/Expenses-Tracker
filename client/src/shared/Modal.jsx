import { CgClose } from "react-icons/cg";

export const Modal = ({
  open,
  onClose,
  title,
  subTitle,
  className = "",
  children,
}) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center px-3 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white shadow-lg pb-5 rounded-md`}
      >
        {/* ✅ Header outside padding wrapper so it stays truly top-fixed */}
        <div className="flex items-start justify-between px-2 pt-3">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}
            {subTitle && (
              <span className="text-[10px] text-[#333333]">{subTitle}</span>
            )}
          </div>
          <button onClick={onClose} className="font-semibold cursor-pointer">
            <CgClose size={22} strokeWidth={0.8} />
          </button>
        </div>

        {/* ✅ Body with inner padding */}
        <div className={`px-8 ${className}`}>{children}</div>
      </div>
    </div>
  );
};
