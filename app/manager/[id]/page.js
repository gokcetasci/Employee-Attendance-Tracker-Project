"use client";
import React from "react";
import useStore from "@/utils/store";
import EmployeeAttendancePage from "@/components/employeeattendence";

function ManagerPage({ params }) {
  const managerId = params.id;
  const { admin } = useStore();

  // Manager ID'sine göre ilgili manager'ı bul
  const branch = admin.branches.find(branch => branch.manager.id === parseInt(managerId));
  if (!branch) return <div>Manager not found!</div>;

  const { name, employees } = branch.manager;

  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>            <EmployeeAttendancePage employee={employee} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerPage;
