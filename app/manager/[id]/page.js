"use client";
import React, { useState } from "react";
import useStore from "@/utils/store";
import GeneralCalendar from "@/components/generalcalendar";
import { FcAssistant } from "react-icons/fc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FcCalendar,FcManager } from "react-icons/fc";

function ManagerPage({ params }) {
  const managerId = parseInt(params.id);
  const { admin } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Manager ID'sine göre ilgili manager'ı bul
  const branch = admin.branches.find(
    (branch) => branch.manager.id === managerId
  );
  console.log(branch); // Yönetici bilgisini konsola yazdır

  const { name, employees } = branch.manager;

  // İlgili yöneticinin çalışanlarını filtrele
  const managerEmployees = employees;

  return (
    <div>
      <div className="px-3 sm:px-12 sm:px-3 py-3 bg-gradient-to-r from-blue-400 to-indigo-200 flex flex-row items-center justify-between shadow-xl">
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
          <FcAssistant className="w-8 sm:w-10 h-8 sm:h-10 p-1  rounded-full border border-1 border-gray-500 bg-white" />
          <h2 className=" text-sm sm:text-[16px] font-extrabold text-white">{name}</h2>
        </div>

        <div className="flex flex-row gap-2 sm:gap-7">
          <div className="relative flex flex-row items-center justify-center ">
            <h1 className=" text-sm sm:text-[16px] text-blue-800 font-bold">Çalışanlar</h1>
            <span onClick={toggleDropdown}>
              <MdKeyboardArrowDown className="w-6 h-6 text-indigo-800 hover:text-blue-500 hover:scale-110" />
            </span>{" "}
            {showDropdown && (
              <ul
                className="absolute left-0 top-full bg-white  rounded-md mt-1 shadow-lg z-10 text-gray-500 w-[200px]"
                style={{ boxShadow: "0 0 4px #cbd5e1" }}
              >
                {managerEmployees.map((employee) => (
                  <li
                    key={employee.id}
                    className="py-1 px-3 cursor-pointer hover:bg-gray-100 "
                  >
                    <p className="flex flex-row items-center gap-2">
                      <FcManager className="text-indigo-600" />
                      {employee.name}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center justify-center">
          <p className="text-indigo-800 text-sm sm:text-[16px]">
            <span className="text-blue-800 font-bold">Şube:</span> {branch.name}
          </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-10 shadow-2xl m-10">
        {/* Admin Takvimi */}
        <div className="flex flex-row items-center gap-2 pb-3 border-b mb-3 border-indigo-200">  
          <span><FcCalendar className="w-6 h-6"/></span>
          <h1 className="text-indigo-500 font-semibold">Çalışan Yoklama Takvimi</h1>
        </div>
        <GeneralCalendar employees={managerEmployees} managerId={managerId} />
      </div>
    
    </div>
  );
}

export default ManagerPage;
