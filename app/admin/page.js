"use client";
import React, { useState } from "react";
import GeneralCalendar from "@/components/generalcalendar";

const AdminPage = () => {
  const [allowPastAndFutureChanges, setAllowPastAndFutureChanges] =
    useState(false); // Geçmiş ve gelecek değişikliklere izin verme durumu

  return (
    <div className="container mx-auto">
      <div className="mb-5 flex justify-end">
        <div className="mt-4 relative flex flex-row">
          <span className="mr-2 text-xl font-medium text-gray-700 ">
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
            className={`block w-14 h-8 bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
              allowPastAndFutureChanges ? "bg-indigo-500" : ""
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                allowPastAndFutureChanges ? "translate-x-6" : ""
              }`}
            ></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-10 shadow-2xl">
        {/* Admin Takvimi */}
        <GeneralCalendar
          allowPastAndFutureChanges={allowPastAndFutureChanges} // Geçmiş ve gelecek değişikliklere izin verme durumu
        />
      </div>
    </div>
  );
};

export default AdminPage;
