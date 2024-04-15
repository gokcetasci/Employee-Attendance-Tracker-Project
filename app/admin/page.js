"use client";
import React, { useState } from "react";
import GeneralCalendar from "@/components/generalcalendar";
import { FcCalendar } from "react-icons/fc";
const AdminPage = () => {
  const [allowPastAndFutureChanges, setAllowPastAndFutureChanges] =
    useState(false); // Geçmiş ve gelecek değişikliklere izin verme durumu

  return (
    <div className="container mx-auto">
      <div className="mb-5 flex justify-end">
        <div className=" mt-4 relative flex flex-row rounded-md items-center justify-center p-2 ">
          <span className="mr-[4px] sm:mr-2 text-[12px]  sm:text-[16px] font-medium text-gray-700 ">
            Geçmiş ve gelecek tarihler için değişikliklere izin ver
          </span>
          <input
            type="checkbox"
            id="allowChangesToggle"
            name="allowChangesToggle"
            className="sr-only"
            checked={allowPastAndFutureChanges}
            onChange={(e) => setAllowPastAndFutureChanges(e.target.checked)}
          />
          <label
            htmlFor="allowChangesToggle"
            className={`block w-10 h-6 bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
              allowPastAndFutureChanges ? "bg-indigo-500" : ""
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                allowPastAndFutureChanges ? "translate-x-4" : ""
              }`}
            ></div>
          </label>
        </div>
      </div>
  
      
      <div className="bg-white rounded-xl p-10 shadow-2xl ">
        {/* Admin Takvimi */}
        <div className="flex flex-row items-center gap-2 pb-3 border-b mb-3 border-indigo-200">  
          <span><FcCalendar className="w-6 h-6"/></span>
          <h1 className="text-indigo-500 font-semibold">Çalışan Yoklama Takvimi</h1>
        </div>
        <GeneralCalendar
          allowPastAndFutureChanges={allowPastAndFutureChanges} // Geçmiş ve gelecek değişikliklere izin verme durumu
        />
      </div>
    </div>
  );
};

export default AdminPage;
