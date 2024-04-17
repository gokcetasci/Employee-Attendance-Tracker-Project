"use client";
import React from "react";
import useStore from "@/utils/store";
import PersonalCalendar from "@/components/personalcalendar";
import { FcAssistant } from "react-icons/fc";

function EmployeePage({ params }) {
  const employeeId = parseInt(params.id);
  const { admin } = useStore();

  // Employee bulunamazsa mesaj döndür
  const employee = admin.branches
    .flatMap((branch) => branch.manager.employees)
    .find((emp) => emp.id === employeeId);
  if (!employee) return <div>Employee not found!</div>;

  // Employee'nin bağlı olduğu branch'i bul
  const branch = admin.branches.find((branch) =>
    branch.manager.employees.some((emp) => emp.id === employeeId)
  );

  return (
    <div className="w-full h-screen bg-slate-50">
      
      <div className="px-3 sm:px-12 sm:px-3 py-3 bg-gradient-to-r from-blue-400 to-indigo-200 flex flex-row items-center justify-between shadow-xl">
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
          <FcAssistant className="w-8 sm:w-10 h-8 sm:h-10 p-1 rounded-full border border-1 border-gray-500 bg-white" />
          <h2 className="text-sm sm:text-[16px] font-extrabold text-white">{employee.name}</h2>
        </div>
        <div className="flex flex-row gap-2 sm:gap-7 text-sm sm:text-[16px]">
          <p className="text-indigo-800">
            <span className="text-blue-800 font-bold">Şube:</span> {branch.name}
          </p>
          <p className="text-indigo-800">
            <span className="text-blue-800 font-bold">Müdür:</span>{" "}
            {branch.manager.name}
          </p>
        </div>
      </div>
          {/* Grafiksel Gösterim */}
          <div className="flex flex-row items-center justify-center gap-2 py-10">
        <div className="w-6 h-6 bg-green-300 rounded-full"></div>
        <p>Geldi</p>
        <div className="w-6 h-6 bg-red-300 rounded-full"></div>
        <p>Gelmedi</p>
        <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
        <p>İzinli</p>
      </div>
      {/* PersonalCalendar bileşenini çağırıyoruz ve ilgili işçinin bilgilerini aktarıyoruz */}
      <PersonalCalendar employee={employee} />
  
    </div>
  );
}

export default EmployeePage;
