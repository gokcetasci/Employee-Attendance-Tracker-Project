"use client"
import React from "react";
import useStore from "@/utils/store";
import GeneralCalendar from "@/components/generalcalendar";

function EmployeePage({ params }) { 
    const employeeId = parseInt(params.id); 
    const { admin } = useStore();
  
    // Employee bulunamazsa mesaj döndür
    const employee = admin.branches.flatMap(branch => branch.manager.employees).find(emp => emp.id === employeeId);
    if (!employee) return <div>Employee not found!</div>;
  
    // Employee'nin bağlı olduğu branch'i bul
    const branch = admin.branches.find(branch => branch.manager.employees.some(emp => emp.id === employeeId));
  
    return (
      <div>
        <h2>{employee.name}</h2>
        <p>Branch: {branch.name}</p>
        <GeneralCalendar employees={[employee]} /> {/* GeneralCalendar bileşenini çağırırken ilgili işçinin bilgilerini aktarıyoruz */}
      </div>
    );
}

export default EmployeePage;
