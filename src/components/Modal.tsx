import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="relative bg-gray-900 rounded-xl p-6 max-w-2xl w-full shadow-xl border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-300">
            <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full mb-4"></div>
            <p>Processing...</p>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
