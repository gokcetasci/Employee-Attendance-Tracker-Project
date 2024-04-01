"use client";
import React, { useState } from "react";

function PersonalCalendar({ employee }) {
  const { attendance } = employee;
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // Ayı değiştiren fonksiyon
  const changeMonth = (increment) => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      // Eğer yeni ay 1'den küçükse, Aralık ayına döndür ve yılı bir önceki yıla ayarla
      if (newMonth < 1) {
        newMonth = 12;
        setYear((prevYear) => prevYear - 1);
      }
      // Eğer yeni ay 12'den büyükse, Ocak ayına döndür ve yılı bir sonraki yıla ayarla
      else if (newMonth > 12) {
        newMonth = 1;
        setYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  // Seçilen aydaki gün sayısını hesapla
  const daysInMonth = new Date(year, month, 0).getDate();

  // Ay isimlerini Türkçe olarak ayarla
  const turkishMonthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  return (
    <div className="m-12 shadow-md bg-white rounded-md p-5">
      {/* Ay değiştirme butonları */}
      <div className="mt-4 flex flex-row items-center justify-center gap-10 mb-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => changeMonth(-1)}
        >
          Önceki Ay
        </button>
        <h3 className="text-lg font-bold mb-2">{`${
          turkishMonthNames[month - 1]
        }/${year}`}</h3>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => changeMonth(1)}
        >
          Sonraki Ay
        </button>
      </div>
      {/* Haftanın günlerini gösteren satır */}
      <div className="grid grid-cols-7 gap-1">
        {["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map((day) => (
          <div key={day} className="text-center font-bold text-gray-800">
            {day}
          </div>
        ))}
        {/* Takvim günlerini gösteren satırlar */}
        {[...Array(daysInMonth)].map((_, index) => {
          const currentDate = new Date(year, month - 1, index + 1)
            .toISOString()
            .split("T")[0];
          const currentRecord = attendance.find(
            (record) => record.date === currentDate
          );
          let backgroundColor;
          if (currentRecord) {
            switch (currentRecord.status) {
              case "gelmedi":
                backgroundColor = "#f87171";
                break;
              case "izinli":
                backgroundColor = "#fef08a";
                break;
              default:
                backgroundColor = "#86efac";
            }
          } else {
            backgroundColor = "white";
          }
          return (
            <div
              key={index}
              className="text-center border border-indigo-200 p-2"
              style={{ backgroundColor }}
            >
              <div className="text-gray-500">{index + 1}</div>
              <div className="text-md mt-1 font-medium ">
                {currentRecord ? currentRecord.status : "-"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalCalendar;
