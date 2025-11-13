
import React from "react";
import { useComponentsDisplayStore } from "../store/componentsStore";

interface OptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Options: React.FC<OptionsProps> = ({ isOpen, onClose }) => {
  const setLoginDisplay = useComponentsDisplayStore((state) => state.setLoginDisplay)
  if (!isOpen) return null;

  const logOut = () => {
    setLoginDisplay(true)
  }

  return (
    <div
      className="absolute top-12 right-4 bg-white shadow-lg border border-gray-300 rounded-lg z-50 w-48"
      onClick={onClose} // closes popup if you click inside
    >
      <ul className="text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Chat</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Archived</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logOut}>Logout</li>
      </ul>
    </div>
  );
};
