import React from 'react';
import useStore from '@/utils/store';

const EmployeeAttendancePage = ({ employee }) => {
  const handleAttendanceChange = (date, status, explanation) => {
    // Yoklama bilgisini güncelleme işlemi burada yapılacak
    console.log(`Employee ${employee.id} - Date: ${date}, Status: ${status}, Explanation: ${explanation}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Çalışan Yoklama Ekranı</h1>
      <h2 className="text-xl font-semibold mb-2">{employee.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Durum</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {employee.attendance.map(entry => (
            <tr key={entry.date}>
              <td>{entry.date}</td>
              <td>
                <select value={entry.status} onChange={e => handleAttendanceChange(entry.date, e.target.value, entry.explanation)}>
                  <option value="geldi">Geldi</option>
                  <option value="gelmedi">Gelmedi</option>
                  <option value="izinli">İzinli</option>
                  <option value="boş">Boş</option>
                </select>
              </td>
              <td><input type="text" value={entry.explanation} onChange={e => handleAttendanceChange(entry.date, entry.status, e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendancePage;
