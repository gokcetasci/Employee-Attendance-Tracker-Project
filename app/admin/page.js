"use client";
// AdminPage.js
import React, { useState } from "react";
import useStore from "@/utils/store";
import GeneralCalendar from "@/components/generalcalendar";
import { FaSquare } from "react-icons/fa";
import PersonalCalendar from "@/components/personalcalendar";

const AdminPage = () => {
  const { admin } = useStore();
  const [allowPastAndFutureChanges, setAllowPastAndFutureChanges] = useState(false); // Geçmiş ve gelecek değişikliklere izin verme durumu

  return (
    <div className="container mx-auto">
      <div>
        {/* Şubeler */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Şubeler</h2>
          <div className="flex flex-row">
            {admin.branches.map((branch) => (
              <div key={branch.id} className="border p-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">{branch.name}</h3>
                <p>ID: {branch.id}</p>
                <p>Müdür: {branch.manager.name}</p>

                {/* Çalışanlar */}
                <h4 className="text-md font-semibold mt-2">Çalışanlar</h4>
                <ul>
                  {branch.manager.employees.map((employee) => (
                    <li key={employee.id}>{employee.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    
      <div className="bg-white rounded-xl p-10 shadow-2xl">
        {/* Admin Takvimi */}
        <GeneralCalendar
          s={allowPastAndFutureChanges} // Geçmiş ve gelecek değişikliklere izin verme durumu
        />
    
      </div>
      <div className="mt-4">
        <label htmlFor="allowChangesToggle" className="block text-sm font-medium text-gray-700">
          Geçmiş ve gelecek değişikliklere izin ver
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="checkbox"
            id="allowChangesToggle"
            name="allowChangesToggle"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={allowPastAndFutureChanges}
            onChange={(e) => setAllowPastAndFutureChanges(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
