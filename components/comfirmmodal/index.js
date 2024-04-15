import React from 'react';

const ConfirmModal = ({ show, handleClose, confirmSaveChanges }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${show ? '' : 'hidden'}`}>
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-20 mx-5 sm:mx-0 ">
        <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Değişiklikleri Kaydet</h2>
        <p className="text-sm mb-4 text-center">Değişiklikleri kaydetmek istediğinizden emin misiniz?</p>
        <div className="flex justify-center items-center gap-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105" onClick={confirmSaveChanges}>Evet</button>
          <button className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105" onClick={handleClose}>Hayır</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
