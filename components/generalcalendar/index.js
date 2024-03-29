"use client";
import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameDay,
} from "date-fns";
import { tr } from "date-fns/locale";
import {
  FaEllipsisV,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { FcAddDatabase } from "react-icons/fc";
import Popup from "../popup";

const GeneralCalendar = ({ employees }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatuses, setAttendanceStatuses] = useState({});
  const [editable, setEditable] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  // Component yüklendiğinde varsayılan tarih için işlev çağrısı yapma
  useEffect(() => {
    handleDateClick(new Date());
  }, []);

  // Tarih değiştirme işlevi
  const handleDateClick = (date) => {
    const today = new Date();
    if (isSameDay(date, today)) {
      setEditable(true);
      setSelectedDate(date);
    } else {
      setEditable(false);
    }
  };

  // Yoklama durumu değiştirme işlevi
  const handleAttendanceChange = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setPopupOpen(true);
  };

  // Kaydetme işlevi
  const handleSave = (values) => {
    if (selectedEmployeeId !== null) {
      const updatedStatuses = { ...attendanceStatuses };
      updatedStatuses[selectedEmployeeId] = {
        status: values.status,
        explanation: values.explanation,
      };
      setAttendanceStatuses(updatedStatuses);
      setPopupOpen(false);
      setSelectedEmployeeId(null);
    }
  };

  // Takvim bileşenini oluşturma işlevi
  const renderCalendar = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-[150px] h-[50px] flex justify-center items-center border">
            <p className="text-blue-900 font-bold text-xl">Çalışanlar</p>
          </div>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className={`w-[150px] h-[50px] border flex justify-center items-center  ${
                isToday(day) ? "bg-blue-200" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              <div className="font-semibold mb-1">
                {format(day, "d", { locale: tr })}
              </div>
            </div>
          ))}
        </div>
        {employees.map((employee) => (
          <div key={employee.id} className="flex">
            <div className="w-[150px] h-[50px] p-2 border font-semibold flex items-center justify-center">
              {employee.name}
            </div>
            {daysOfWeek.map((day) => {
              const attendanceData = employee.attendance.find(
                (att) => att.date === format(day, "yyyy-MM-dd")
              );
              return (
                <div
                  key={`${employee.id}-${day}`}
                  className={`p-2 border flex items-center justify-center  ${
                    editable && isSameDay(day, selectedDate)
                      ? ""
                      : ""
                  }`}
                  style={{ width: "150px", height: "50px" }}
                >
                  {editable && isSameDay(day, selectedDate) ? (
                    <div>
                      <FcAddDatabase
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => handleAttendanceChange(employee.id)}
                      />
                      {attendanceStatuses[employee.id] && (
                        <div>
                          {attendanceStatuses[employee.id].status}
                          {attendanceStatuses[employee.id].status ===
                            "Gelmedi" && (
                            <span>
                              {" "}
                              - {attendanceStatuses[employee.id].explanation}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {attendanceData ? (
                        <div>
                          <span>{attendanceData.status}</span>
                          {attendanceData.explanation && (
                            <span> - {attendanceData.explanation}</span>
                          )}
                        </div>
                      ) : (
                        <div>---</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8 gap-5 flex items-center justify-center">
        <button
          id="lastmonth"
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
            )
          }
        >
          <FaRegArrowAltCircleLeft className="text-pink-400 w-6 h-6 hover:text-indigo-600 hover:scale-110" />
        </button>
        <button
          id="currentmonth
"
          className="w-[150px]"
          onClick={() => setSelectedDate(new Date())}
        >
          {" "}
          <h2 className="text-xl font-semibold text-gray-600">
            {format(selectedDate, "MMMM yyyy", { locale: tr })}
          </h2>
        </button>
        <button
          id="nextmonth"
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
            )
          }
        >
          <FaRegArrowAltCircleRight className="text-pink-400 w-6 h-6 hover:text-indigo-600 hover:scale-110" />{" "}
        </button>
      </div>
      <div className=" shadow-xl">
        {renderCalendar()}
        {popupOpen && (
          <Popup
            handleSave={handleSave}
            handleClose={() => setPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GeneralCalendar;
