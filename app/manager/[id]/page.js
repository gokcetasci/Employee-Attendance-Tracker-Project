"use client"
import React from "react";
import useStore from "@/utils/store";
import AttendanceCalendar from "@/components/generalcalendar";

function ManagerPage({ params }) {
  const managerId = parseInt(params.id);
  const { admin } = useStore();

  // Manager ID'sine göre ilgili manager'ı bul
  const branch = admin.branches.find((branch) => branch.manager.id === managerId);
  if (!branch) return <div>Manager not found!</div>;

  const { name, employees } = branch.manager;

  // İlgili yöneticinin çalışanlarını filtrele
  const managerEmployees = employees;
 
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {managerEmployees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    
      <AttendanceCalendar employees={managerEmployees} />
    </div>
  );
}

export default ManagerPage;
