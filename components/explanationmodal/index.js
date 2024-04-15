import React from "react";
import { FcAbout } from "react-icons/fc";

const ExplanationModal = ({ explanation, isOpen, onRequestClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex items-center justify-center  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-md  mx-5 sm:mx-0 ">
        <h2 className="flex flex-row gap-2 items-center justify-center text-xl font-bold mb-4 text-indigo-700 border-b border-indigo-200 pb-2">
            <span>
            <FcAbout className="w-6 h-6"/>
            </span>
            Açıklama
        </h2>
        <p className="text-gray-800">{explanation}</p>
        <button
          onClick={onRequestClose}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-end transition duration-300 ease-in-out transform hover:scale-105"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default ExplanationModal;
