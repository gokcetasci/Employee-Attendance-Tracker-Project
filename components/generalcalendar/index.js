"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { FcInfo, FcViewDetails } from "react-icons/fc";
import AttendancePopup from "../attendancepopup";

const GeneralCalendar = ({ allowPastAndFutureChanges }) => {
  const { admin } = useStore.getState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [popupEmployeeNames, setPopupEmployeeNames] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isAttendanceButtonDisabled, setIsAttendanceButtonDisabled] =
    useState(true);

  // Yoklama kaydetme işlevi
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
                attendance.explanation =
                  values.status === "Gelmedi" ? values.explanation : "";
              }
            }
          });
        });
      } else {
        employee.attendance.push({
          date: date.toISOString().split("T")[0],
          status: values.status,
          explanation: values.status === "Gelmedi" ? values.explanation : "",
        });
      }
      useStore.setState({ admin: updatedAdmin });
    }
  };

  // Çalışanın belirli bir tarihte yoklama bilgisini alma
  const getAttendanceStatus = (employeeId, date) => {
    const employee = admin.branches
      .flatMap((branch) => branch.manager.employees)
      .find((employee) => employee.id === employeeId);
    if (employee) {
      const attendance = employee.attendance.find((a) => a.date === date);
      return attendance && attendance.status !== null ? attendance.status : "";
    }
    return "Bilgi yok";
  };

  // Çalışanın explanation bilgisini alma
  const getExplanation = (employeeId, date) => {
    const employee = admin.branches
      .flatMap((branch) => branch.manager.employees)
      .find((employee) => employee.id === employeeId);
    if (employee) {
      const attendance = employee.attendance.find((a) => a.date === date);
      return attendance ? attendance.explanation : "";
    }
    return "";
  };

  const getWeekDates = (date) => {
    const weekDates = [];
    const startOfWeek = new Date(date);

    // Haftanın başlangıcını ayarla
    startOfWeek.setDate(startOfWeek.getDate());

    // Eğer ekran küçükse (mobil), sadece bir sonraki günü ekle
    if (window.innerWidth <= 768) {
      for (let i = 0; i < 1; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day);
      }
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      // Tablet ekranı ise 3 gün ekle
      for (let i = 0; i < 3; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day);
      }
    } else {
      // Ekran büyükse (desktop), 7 gün ekle
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day);
      }
    }

    return weekDates;
  };

  // Haftanın tarihlerini alma işlevini kullanarak, bu haftanın tarihlerini güncelle
  const weekDates = getWeekDates(currentDate);

  // Önceki haftaya gitme işlevi
  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    if (window.innerWidth <= 768) {
      // Mobil ekran kontrolü
      previousWeek.setDate(previousWeek.getDate() - 1); // Mobilde 1 gün geri git
    } else {
      previousWeek.setDate(previousWeek.getDate() - 3); // Tablette 3 gün geri git
    }
    setCurrentDate(previousWeek);
  };

  // Sonraki haftaya gitme işlevi
  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    if (window.innerWidth <= 768) {
      // Mobil ekran kontrolü
      nextWeek.setDate(nextWeek.getDate() + 1); // Mobilde 1 gün ileri git
    } else {
      nextWeek.setDate(nextWeek.getDate() + 3); // Tablette 3 gün ileri git
    }
    setCurrentDate(nextWeek);
  };

  // Belirli bir çalışan için seçim durumunu değiştir
  const toggleEmployeeSelect = (employeeId) => {
    setSelectedEmployees((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };

  // Tümünü seç onay kutusunu değiştir
  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedEmployees).every(
      (selected) => selected
    );
    setSelectedEmployees((prevState) => {
      const newState = {};
      for (const employee of admin.branches.flatMap(
        (branch) => branch.manager.employees
      )) {
        newState[employee.id] = !allSelected;
      }
      return newState;
    });
  };

  useEffect(() => {
    const isAnyEmployeeSelected = Object.values(selectedEmployees).some(
      (selected) => selected
    );
    setIsAttendanceButtonDisabled(!isAnyEmployeeSelected);
  }, [selectedEmployees]);

  const handleOpenPopup = () => {
    const selectedEmployeeNames = Object.keys(selectedEmployees)
      .filter((employeeId) => selectedEmployees[employeeId])
      .flatMap((employeeId) => {
        const employee = admin.branches.flatMap((branch) =>
          branch.manager.employees.filter(
            (emp) => emp.id === parseInt(employeeId)
          )
        );
        return employee.length > 0 ? employee[0].name : "";
      });
    setPopupEmployeeNames(selectedEmployeeNames);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-evenly w-full mb-4">
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
            <th className="border border-gray-300">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={Object.values(selectedEmployees).every(
                  (selected) => selected
                )}
              />
            </th>
            <th className="border border-gray-300"></th>
            {getWeekDates(currentDate).map((date, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2  text-gray-600 text-sm"
              >
                <p>{date.toLocaleDateString("tr-TR", { weekday: "short" })}</p>
                <p>{date.toLocaleDateString("tr-TR")}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {admin.branches
            .flatMap((branch) => branch.manager.employees)
            .map((employee) => (
              <tr key={employee.id}>
                <td className="px-3">
                  <input
                    type="checkbox"
                    checked={selectedEmployees[employee.id] || false}
                    onChange={() => toggleEmployeeSelect(employee.id)}
                  />
                </td>

                <td className="w-[150px] h-[50px] bg-blue-200 border px-4 py-2 flex items-center justify-center text-[16px] font-semibold text-gray-800 hover:text-blue-500">
                  <Link href={`/employee/${employee.id}`}>{employee.name}</Link>
                </td>
                {weekDates.map((date, index) => {
                  const isClickable =
                    allowPastAndFutureChanges ||
                    date.toDateString() === new Date().toDateString();
                  const attendanceStatus = getAttendanceStatus(
                    employee.id,
                    date.toISOString().split("T")[0]
                  );
                  const explanation = getExplanation(
                    employee.id,
                    date.toISOString().split("T")[0]
                  );

                  return (
                    <td
                      key={index}
                      className="w-[150px] h-[50px] border border-gray-300 px-4 py-2"
                    >
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <p>{attendanceStatus}</p>
                        {explanation && (
                          <div className="relative">
                            <FcInfo
                              className="text-gray-600 cursor-pointer"
                              size={20}
                              title={explanation}
                            />
                          </div>
                        )}
                        {isClickable && (
                          <Formik
                            initialValues={{ status: "", explanation: "" }}
                            onSubmit={(values) => {
                              handleSaveAttendance(employee.id, date, values);
                            }}
                          >
                            {({ values, setFieldValue }) => (
                              <Form className="flex flex-row gap-2 text-sm">
                                <Field
                                  className="rounded-sm border border-indigo-400 text-gray-700 outline-none hover:border-indigo-600 p-1"
                                  as="select"
                                  name="status"
                                  onChange={(e) => {
                                    setFieldValue("status", e.target.value);
                                    if (e.target.value === "Gelmedi") {
                                      setFieldValue("explanationVisible", true);
                                    } else {
                                      setFieldValue(
                                        "explanationVisible",
                                        false
                                      );
                                    }
                                  }}
                                >
                                  <option value="">Durum Seçin</option>
                                  <option value="Geldi">Geldi</option>
                                  <option value="Gelmedi">Gelmedi</option>
                                  <option value="İzinli">İzinli</option>
                                </Field>

                                {values.explanationVisible && (
                                  <div className="flex items-center relative">
                                    <FcViewDetails
                                      onClick={() =>
                                        setDropdownVisible((prevState) => ({
                                          ...prevState,
                                          [employee.id]:
                                            !prevState[employee.id],
                                        }))
                                      }
                                      className="text-gray-600 cursor-pointer w-6 h-6 hover:scale-105"
                                      size={20}
                                    />
                                    <div className="dropdown-menu absolute top-0 left-10 z-10">
                                      {dropdownVisible[employee.id] && (
                                        <div className="bg-slate-50 p-4 border border-gray-300 shadow-2xl rounded-md">
                                          <Field
                                            className="flex gap-4 border-2 border-blue-300 rounded-md px-2 py-1 hover:border-indigo-400 outline-none"
                                            type="text"
                                            name="explanation"
                                            placeholder="Neden Gelmedi?"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </Form>
                            )}
                          </Formik>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center">
        <button
          className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-2 rounded-full mt-5 font-medium hover:scale-105 mr-48"
          type="button"
          onClick={handleOpenPopup}
          disabled={isAttendanceButtonDisabled}
        >
          YOKLAMA GİR
        </button>
        {showPopup && (
          <AttendancePopup
            popupEmployeeNames={popupEmployeeNames}
            handleClosePopup={handleClosePopup}
            handleSaveAttendance={handleSaveAttendance}
            currentDate={currentDate}
          />
        )}

        <button
          className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-2 rounded-full mt-5 font-medium hover:scale-105"
          type="submit"
        >
          KAYDET
        </button>
      </div>
    </div>
  );
};

export default GeneralCalendar;
