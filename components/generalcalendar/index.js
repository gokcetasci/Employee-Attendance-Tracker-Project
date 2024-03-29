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
import { FaEllipsisV } from "react-icons/fa";
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
          <div className="w-1/7"></div>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className={`w-1/7 p-2 border text-center ${
                isToday(day) ? "bg-gray-200" : ""
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
            <div className="w-1/7 p-2 border text-center font-semibold">
              {employee.name}
            </div>
            {daysOfWeek.map((day) => {
              const attendanceData = employee.attendance.find(
                (att) => att.date === format(day, "yyyy-MM-dd")
              );
              return (
                <div
                  key={`${employee.id}-${day}`}
                  className={`w-1/7 p-2 border text-center ${
                    editable && isSameDay(day, selectedDate)
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  {editable && isSameDay(day, selectedDate) ? (
                    <div>
                      <FaEllipsisV
                        className="icon"
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
  const initialValues = {
    status: "Boş",
    explanation: "",
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {format(selectedDate, "MMMM yyyy", { locale: tr })}
      </h2>
      <div className="mb-4">
        <button
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
            )
          }
        >
          Önceki Ay
        </button>
        <button onClick={() => setSelectedDate(new Date())}>Şuanki Ay</button>
        <button
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
            )
          }
        >
          Sonraki Ay
        </button>
      </div>
      <div className="border p-4">
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
