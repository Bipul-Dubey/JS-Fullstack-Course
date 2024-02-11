import React, { useEffect, useState } from "react";
import { capitalizeSentences } from "../utils/utils";

const Alertbox = ({ message = "", errorType = "error" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!message) return;
    setIsOpen(true);
    const delayDebounce = setTimeout(() => {
      setIsOpen(false);
    }, 20000);
    return () => clearTimeout(delayDebounce);
  }, [message]);

  const handleCloseAlert = () => {
    setIsOpen(false);
  };

  const getModalClass = () => {
    switch (errorType) {
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      case "success":
        return "bg-green-300";
      case "info":
        return "bg-blue-300";
      default:
        return "bg-gray-500";
    }
  };

  return isOpen ? (
    <div
      className={`fixed top-[10%] right-0 p-4 max-w-prose rounded ${getModalClass()}`}
    >
      <div className="flex justify-between items-center">
        <p className="text-white capitalize text-xl">{errorType}</p>
        <button onClick={handleCloseAlert} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p className="text-white">{capitalizeSentences(message)}</p>
    </div>
  ) : null;
};

export default Alertbox;
