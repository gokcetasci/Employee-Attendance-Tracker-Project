"use client"
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { tr } from 'date-fns/locale';
import useStore from '@/utils/store'; 

const AttendanceCalendar = () => {
  const { admin, updateAttendance } = useStore(); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatuses, setAttendanceStatuses] = useState({}); // Her çalışan için ayrı attendanceStatus tutulacak

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAttendanceChange = (employeeId, status) => {
    const updatedStatuses = { ...attendanceStatuses, [employeeId]: status };
    setAttendanceStatuses(updatedStatuses);
  };

  const handleSave = () => {
    // Her çalışan için statusları güncelle ve kaydet
    Object.keys(attendanceStatuses).forEach(employeeId => {
      const status = attendanceStatuses[employeeId];
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      updateAttendance(employeeId, formattedDate, status);
    });
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
            <div key={day} className="w-1/7 p-2 border text-center">
              <div className="font-semibold mb-1">
                {format(day, 'd', { locale: tr })}
              </div>
            </div>
          ))}
        </div>
        {admin.branches.map(branch => (
          <div key={branch.id}>
            <div className="font-semibold mb-2 mt-4">{branch.name}</div>
            {branch.manager.employees.map(employee => (
              <div key={employee.id} className="flex">
                <div className="w-1/7 p-2 border text-center font-semibold">{employee.name}</div>
                {daysOfMonth.map(day => {
                  const attendanceData = employee.attendance.find(att => att.date === format(day, 'yyyy-MM-dd'));
                  return (
                    <div key={`${employee.id}-${day}`} className="w-1/7 p-2 border text-center">
                      {attendanceData ? (
                        <div>
                          <span>{attendanceData.status}</span>
                          {attendanceData.explanation && <span> - {attendanceData.explanation}</span>}
                        </div>
                      ) : (
                        <div>---</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
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
        <button onClick={handleSave}>Kaydet</button> {/* Kaydetme butonu */}
      </div>
    </div>
  );
};

export default AttendanceCalendar;

