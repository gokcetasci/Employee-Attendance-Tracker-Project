"use client";
import React, { useState } from "react";
import useStore from "@/utils/store";
import Popup from "../popup";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import Link from "next/link";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const GeneralCalendar = ({ allowPastAndFutureChanges }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { admin } = useStore.getState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSaveAttendance = (employeeId, date, values) => {
    const updatedAdmin = { ...admin };
    const employee = updatedAdmin.branches
      .flatMap((branch) => branch.manager.employees)
      .find((employee) => employee.id === employeeId);
    if (employee) {
      const attendanceIndex = employee.attendance.findIndex(
        (a) => a.date === date.toISOString().split("T")[0]
      );
      if (attendanceIndex !== -1) {
        updatedAdmin.branches.forEach((branch) => {
          branch.manager.employees.forEach((emp) => {
            if (emp.id === employeeId) {
              const attendance = emp.attendance.find(
                (a) => a.date === date.toISOString().split("T")[0]
              );
              if (attendance) {
                attendance.status = values.status;
                if (values.status === "Gelmedi") {
                  attendance.explanation = values.explanation;
                } else {
                  delete attendance.explanation;
                }
              }
            }
          });
        });
      } else {
        employee.attendance.push({
          date: date.toISOString().split("T")[0],
          status: values.status,
          explanation:
            values.status === "Gelmedi" ? values.explanation : undefined,
        });
      }
      useStore.setState({ admin: updatedAdmin });
    }
    setPopupOpen(false);
  };

  const getAttendanceStatus = (employeeId, date) => {
    const employee = admin.branches
      .flatMap((branch) => branch.manager.employees)
      .find((employee) => employee.id === employeeId);
    if (employee) {
      const attendance = employee.attendance.find((a) => a.date === date);
      return attendance ? attendance.status : "Bilgi yok";
    }
    return "Bilgi yok";
  };

  const getExplanation = (employeeId, date) => {
    const employee = admin.branches
      .flatMap((branch) => branch.manager.employees)
      .find((employee) => employee.id === employeeId);
    if (employee) {
      const attendance = employee.attendance.find((a) => a.date === date);
      return attendance && attendance.explanation ? attendance.explanation : "";
    }
    return "";
  };

  const getWeekDates = (date) => {
    const weekDates = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDates.push(day);
    }
    return weekDates;
  };

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const openPopup = (employeeId, date) => {
    setSelectedEmployee(employeeId);
    setSelectedDate(date);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <button onClick={goToPreviousWeek}>
          <FaRegArrowAltCircleLeft className="text-pink-400 w-6 h-6 hover:text-indigo-600 hover:scale-110" />
        </button>
        <h2 className="text-xl font-semibold text-gray-600">
          {currentDate.toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
          })}
        </h2>
        <button onClick={goToNextWeek}>
          {" "}
          <FaRegArrowAltCircleRight className="text-pink-400 w-6 h-6 hover:text-indigo-600 hover:scale-110" />
        </button>
      </div>

      <table className="border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300"></th>
            {getWeekDates(currentDate).map((date, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                <p>{date.toLocaleDateString("tr-TR", { weekday: "short" })}</p>
                <p>{date.toLocaleDateString("tr-TR")}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {admin.branches.flatMap((branch) => branch.manager.employees).map((employee) => (
            <tr key={employee.id}>
              <td className="w-[150px] h-[50px] bg-blue-200 border px-4 py-2 flex items-center justify-center "><Link href={`/employee/${employee.id}`}>{employee.name}</Link></td>
              {getWeekDates(currentDate).map((date, index) => {
                const isClickable =
                  allowPastAndFutureChanges ||
                  date.toDateString() === new Date().toDateString();
                return (
                  <td key={index} className="w-[150px] h-[50px]  border border-gray-300 px-4 py-2">
                    <div className="flex flex-row gap-2  items-center justify-center">
                      <p>
                        {getAttendanceStatus(
                          employee.id,
                          date.toISOString().split("T")[0]
                        )}
                      </p>
                      {isClickable && (
                        <FaEdit
                          onClick={() =>
                            openPopup(employee.id, date)
                          }
                          className="cursor-pointer"
                        />
                      )}
                      {getAttendanceStatus(
                        employee.id,
                        date.toISOString().split("T")[0]
                      ) === "Gelmedi" &&
                        getExplanation(
                          employee.id,
                          date.toISOString().split("T")[0]
                        ) && (
                          <FaInfoCircle
                            onClick={() =>
                              alert(
                                getExplanation(
                                  employee.id,
                                  date.toISOString().split("T")[0]
                                )
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {popupOpen && (
        <Popup
          handleSave={handleSaveAttendance}
          handleClose={closePopup}
          employeeId={selectedEmployee}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default GeneralCalendar;
