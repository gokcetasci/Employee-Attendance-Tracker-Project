"use client";
import React, { useState } from "react";
import { FcInfo } from "react-icons/fc";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import ExplanationModal from "../explanationmodal";

function PersonalCalendar({ employee }) {
  const { attendance } = employee;
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalExplanation, setModalExplanation] = useState("");

  // Ayı değiştiren fonksiyon
  const changeMonth = (increment) => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      let newYear = year;
      // Eğer yeni ay 1'den küçükse, Aralık ayına döndür ve yılı bir önceki yıla ayarla
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      // Eğer yeni ay 12'den büyükse, Ocak ayına döndür ve yılı bir sonraki yıla ayarla
      else if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
      setYear(newYear); // Yılı güncelle
      return newMonth;
    });
  };

  // Seçilen aydaki gün sayısını hesapla
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Ayın ilk gününün haftanın hangi günü olduğunu al

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

  // Haftanın günlerini Türkçe olarak ayarla (Gerçek takvime uygun olarak)
  const turkishDayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  //neden gelmedi bilgisi için modal
  const handleExplanationClick = (explanation) => {
    setModalExplanation(explanation);
    setModalIsOpen(true);
  };
  
  return (
    <div className="mx-12 shadow-md bg-white rounded-md p-5">
      {/* Ay değiştirme butonları */}
      <div className="mt-4 flex flex-row items-center justify-center gap-10 mb-10">
        <button onClick={() => changeMonth(-1)}>
          <FaRegArrowAltCircleLeft className="text-pink-400 w-6 h-6 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-110" />
        </button>
        <h3 className="text-lg font-bold text-gray-600">{`${
          turkishMonthNames[month - 1]
        }/${year}`}</h3>
        <button onClick={() => changeMonth(1)}>
          <FaRegArrowAltCircleRight className="text-pink-400 w-6 h-6 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-110" />
        </button>
      </div>
      {/* Haftanın günlerini gösteren satır */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-1">
        {turkishDayNames.map((day, index) => (
          <div
            key={index}
            className="items-center justify-center font-bold text-gray-800 hidden sm:flex"
          >
            {day}
          </div>
        ))}
        {/* Takvim günlerini gösteren satırlar */}
        {[...Array(daysInMonth + firstDayOfMonth)].map((_, index) => {
          const dayOfMonth = index - firstDayOfMonth + 1; // Ayın ilk gününden başlayarak günleri ayarla
          const currentDate = new Date(year, month - 1, dayOfMonth);
          const currentRecord = attendance.find(
            (record) => record.date === currentDate.toISOString().split("T")[0]
          );
          let backgroundColor;
          if (currentRecord) {
            switch (currentRecord.status) {
              case "Gelmedi":
                backgroundColor = "#f87171";
                break;
              case "İzinli":
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
              className="text-center border border-indigo-200 p-2 relative "
              style={{ backgroundColor }}
            >
              <div className="text-gray-500">
                {dayOfMonth > 0 ? dayOfMonth : ""}
              </div>
              <div className="text-sm sm:text-md mt-1 font-medium">
                {currentRecord ? currentRecord.status : "-"}
              </div>
              {currentRecord &&
                currentRecord.status === "Gelmedi" &&
                currentRecord.explanation && (
                  <div className="absolute top-1 right-1">
                    <FcInfo
                      className="text-gray-600 cursor-pointer"
                      size={20}
                      title={currentRecord.explanation}
                      onClick={() =>
                        handleExplanationClick(currentRecord.explanation)
                      }
                    />
                    <ExplanationModal
                      explanation={modalExplanation}
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                    />
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalCalendar;
