"use client";
import React, { useState } from "react";

const DateFilterPage = ({ handleFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState("");

  // Seçilen tarihi güncellemek için kullanılan işlev
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Filtreleme formunu göndermek için kullanılan işlev
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    handleFilterChange(selectedDate);
  };

  return (
    <div className="flex ">
      <form
        onSubmit={handleFilterSubmit}
        className="flex gap-4"
      >
        <div>
          <label htmlFor="selectedDate" className="block text-gray-700 mb-1 ">
            Tarih Seç:
          </label>
          <input
            type="date"
            id="selectedDate"
            name="selectedDate"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500 text-gray-500"
          />
        </div>
        <div className="flex items-center justify-center mt-6">
          <button type="submit" className=" flex flex-row bg-blue-600 hover:bg-blue-700  text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out transform hover:scale-105" >
            Git
          </button>
        </div>
      </form>
    </div>
  );
};

export default DateFilterPage;
