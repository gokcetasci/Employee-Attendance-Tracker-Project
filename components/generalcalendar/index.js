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

const GeneralCalendar = ({ employees }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatuses, setAttendanceStatuses] = useState({});
  const [editable, setEditable] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] =
    useState("Boş");

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
  const handleAttendanceChange = (employeeId, status) => {
    setSelectedEmployeeId(employeeId);
    setSelectedAttendanceStatus(status);
    setPopupOpen(true);
  };

  // Açıklama değiştirme işlevi
  const handleExplanationChange = (event) => {
    // Input alanının yeni değerini alın
    const inputValue = event.target.value;
    // Input değerini her zaman güncelleyin
    setExplanation(inputValue);
  };
  
  // Kaydetme işlevi
  const handleSave = () => {
    if (selectedEmployeeId !== null) {
      const updatedStatuses = { ...attendanceStatuses };
      updatedStatuses[selectedEmployeeId] = {
        status: selectedAttendanceStatus,
        explanation,
      };
      setAttendanceStatuses(updatedStatuses);
      setPopupOpen(false);
      setSelectedAttendanceStatus("Boş");
      setSelectedEmployeeId(null);
      setExplanation("");
    }
  };

  // pop-up bileşeni
  const Popup = ({ onClose }) => (
    <div       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
    >
      <div className="relative bg-white p-4 sm:p-8 rounded-md shadow-md w-[340px] sm:w-[400px] md:w-[450px]">
        <select
          value={selectedAttendanceStatus}
          onChange={(e) => setSelectedAttendanceStatus(e.target.value)}
        >
          <option value="Boş">Boş</option>
          <option value="Geldi">Geldi</option>
          <option value="Gelmedi">Gelmedi</option>
          <option value="İzinli">İzinli</option>
        </select>
        {selectedAttendanceStatus === "Gelmedi" && (
          <div>
            <input
              type="text"
              value={explanation}
              onChange={handleExplanationChange}
              placeholder="Neden gelmedi?"
            />
          </div>
        )}
        <button onClick={handleSave}>Kaydet</button>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
  );

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
                        onClick={() =>
                          handleAttendanceChange(
                            employee.id,
                            attendanceStatuses[employee.id]
                          )
                        }
                      />{" "}
                      {/* Icon */}
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
        {/* Popup bileşenini render etme */}
        {popupOpen && <Popup onClose={() => setPopupOpen(false)} />}
      </div>
    </div>
  );
};

export default GeneralCalendar;
