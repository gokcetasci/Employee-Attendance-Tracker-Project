"use client"
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import useStore from '@/utils/store'; 

const AttendanceCalendar = ({ employees }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatuses, setAttendanceStatuses] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendanceStatuses'));
    if (storedAttendance) {
      setAttendanceStatuses(storedAttendance);
    } else {
      const defaultStatuses = {};
      employees.forEach(employee => {
        defaultStatuses[employee.id] = 'Boş'; // Varsayılan olarak herkes "Boş" olarak işaretlenir
      });
      setAttendanceStatuses(defaultStatuses);
    }
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('attendanceStatuses', JSON.stringify(attendanceStatuses));
  }, [attendanceStatuses]);

  useEffect(() => {
    handleDateClick(new Date());
  }, []);

  const handleDateClick = (date) => {
    const today = new Date();
    if (isSameDay(date, today)) {
      setEditable(true);
      setSelectedDate(date);
    } else {
      setEditable(false);
    }
  };

  const handleAttendanceChange = (employeeId, status) => {
    const updatedStatuses = { ...attendanceStatuses, [employeeId]: status };
    setAttendanceStatuses(updatedStatuses);
  };

  const handleExplanationChange = (employeeId, explanation) => {
    const updatedStatuses = { ...attendanceStatuses };
    updatedStatuses[employeeId] = { status: 'Gelmedi', explanation };
    setAttendanceStatuses(updatedStatuses);
  };

  const handleSave = () => {
    localStorage.setItem('attendanceStatuses', JSON.stringify(attendanceStatuses));
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const daysOfMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className='container mx-auto'>
        <div className="flex">
          <div className="w-1/7"></div>
          {daysOfMonth.map(day => (
            <div key={day} className={`w-1/7 p-2 border text-center ${isToday(day) ? 'bg-gray-200' : ''}`} onClick={() => handleDateClick(day)}>
              <div className="font-semibold mb-1">
                {format(day, 'd', { locale: tr })}
              </div>
            </div>
          ))}
        </div>
        {employees.map(employee => (
          <div key={employee.id} className="flex">
            <div className="w-1/7 p-2 border text-center font-semibold">{employee.name}</div>
            {daysOfMonth.map(day => {
              const attendanceData = employee.attendance.find(att => att.date === format(day, 'yyyy-MM-dd'));
              return (
                <div key={`${employee.id}-${day}`} className={`w-1/7 p-2 border text-center ${editable && isSameDay(day, selectedDate) ? 'bg-gray-200' : ''}`}>
                  {editable && isSameDay(day, selectedDate) ? (
                    <select
                      value={attendanceStatuses[employee.id]}
                      onChange={e => handleAttendanceChange(employee.id, e.target.value)}
                    >
                      <option value="Boş">Boş</option>
                      <option value="Geldi">Geldi</option>
                      <option value="Gelmedi">Gelmedi</option>
                      <option value="İzinli">İzinli</option>
                    </select>
                  ) : (
                    <div>
                      {attendanceData ? (
                        <div>
                          <span>{attendanceData.status}</span>
                          {attendanceData.explanation && <span> - {attendanceData.explanation}</span>}
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
      <h2 className="text-xl font-semibold mb-4">{format(selectedDate, 'MMMM yyyy', { locale: tr })}</h2>
      <div className="mb-4">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}>Önceki Ay</button>
        <button onClick={() => setSelectedDate(new Date())}>Şuanki Ay</button>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}>Sonraki Ay</button>
      </div>
      <div className="border p-4">
        {renderCalendar()}
        {editable && (
          <button onClick={handleSave}>Kaydet</button>
        )}
      </div>
    </div>
  );
};

export default AttendanceCalendar;