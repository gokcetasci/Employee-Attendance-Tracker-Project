"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaPlus,
} from "react-icons/fa";
import { FcAbout, FcAddDatabase, FcCheckmark } from "react-icons/fc";
import AttendancePopup from "../attendancepopup";
import { IoMdClose } from "react-icons/io";
import { TbEditCircle } from "react-icons/tb";
import EditForm from "../editform";
import DateFilterPage from "../datefilter";
import EmployeeFilter from "../employeefilter";
import ConfirmModal from "../comfirmmodal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExplanationModal from "../explanationmodal";

const GeneralCalendar = ({ allowPastAndFutureChanges, managerId }) => {
  const { admin } = useStore.getState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [popupEmployeeNames, setPopupEmployeeNames] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isAttendanceButtonDisabled, setIsAttendanceButtonDisabled] =
    useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [editMode, setEditMode] = useState({});
  const { setAdmin } = useStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalExplanation, setModalExplanation] = useState("");

  //managerpage için çalışan filtreleme işlemleri
  const filteredEmployees = managerId
    ? admin.branches.flatMap((branch) =>
        branch.manager.id === managerId ? branch.manager.employees : []
      )
    : admin.branches.flatMap((branch) => branch.manager.employees);

  //takvimin responsiveliği için eklendi
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // İlk render'dan sonra bir kez çalışır
    handleResize();

    // Eğer pencere boyutu değişirse yeniden hesaplar
    window.addEventListener("resize", handleResize);

    // useEffect hook'undan temizleme fonksiyonu
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    }
    setAdmin(updatedAdmin);
    setDropdownVisible(false);
  };

  // Çalışanın belirli bir tarihte yoklama durumunu alma
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

  // Her hücre için arka plan rengini belirleme işlevi
  const getCellBackgroundColor = (employeeId, date) => {
    const status = getAttendanceStatus(employeeId, date);
    switch (status) {
      case "Geldi":
        return "bg-green-200";
      case "Gelmedi":
        return "bg-red-200";
      case "İzinli":
        return "bg-yellow-200";
      default:
        return "";
    }
  };

  // Çalışanın explanation bilgisini alma
  const getExplanation = (employeeId, date) => {
    const employee = admin.branches
      .flatMap((branch) => branch.manager.employees)
      .find((employee) => employee.id === employeeId);
    if (employee) {
      const attendance = employee.attendance.find((a) => a.date === date);
      if (attendance && attendance.status === "Gelmedi") {
        return attendance.explanation;
      }
    }
    return "";
  };

  const getWeekDates = (date) => {
    const weekDates = [];
    const startOfWeek = new Date(date);

    // Haftanın başlangıcını ayarla
    startOfWeek.setDate(startOfWeek.getDate());
    if (windowWidth <= 768) {
      for (let i = 0; i < 1; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day);
      }
    } else if (windowWidth <= 1024) {
      for (let i = 0; i < 3; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day);
      }
    } else {
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
    let daysToSubtract;
    if (windowWidth <= 768) {
      daysToSubtract = 1; // Ekran küçükse 1 gün çıkar
    } else if (windowWidth <= 1024) {
      daysToSubtract = 3; // Ekran orta büyüklükteyse 3 gün çıkar
    } else {
      daysToSubtract = 7; // Ekran büyükse 7 gün çıkar
    }
    previousWeek.setDate(previousWeek.getDate() - daysToSubtract);
    setCurrentDate(previousWeek);
  };

  // Sonraki haftaya gitme işlevi
  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    let daysToAdd;
    if (windowWidth <= 768) {
      daysToAdd = 1; // Ekran küçükse 1 gün ekle
    } else if (windowWidth <= 1024) {
      daysToAdd = 3; // Ekran orta büyüklükteyse 3 gün ekle
    } else {
      daysToAdd = 7; // Ekran büyükse 7 gün ekle
    }
    nextWeek.setDate(nextWeek.getDate() + daysToAdd);
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

  // Pop-up açma fonksiyonu
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

  // Pop-up kapatma fonksiyonu
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // edit modunu başlat
  const startEditMode = (employeeId, date) => {
    setEditMode({ ...editMode, [`${employeeId}_${date}`]: true });
  };

  // edit modunu bitir
  const endEditMode = () => {
    setEditMode({});
  };

  // Edit ikonuna tıklanınca
  const handleEditClick = (employeeId, date) => {
    startEditMode(employeeId, date);
  };

  //date filter
  const handleFilterChange = (selectedDate) => {
    console.log("Seçilen Tarih:", selectedDate);
    setCurrentDate(new Date(selectedDate)); // Seçilen tarihi currentDate'e ayarla
  };

  // Değişiklikleri kaydetme işlevi
  const handleSaveChanges = () => {
    setShowConfirmModal(true); // Kaydetme işleminden önce onay modalını aç
  };

  // Onay modalını kapatma işlevi
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // Değişiklikleri local storage ile kaydetme işlevi
  const confirmSaveChanges = () => {
    // Değişiklikleri kaydetme işlemini burada gerçekleştir
    localStorage.setItem("adminData", JSON.stringify(admin));
    setShowConfirmModal(false); // Onay modalını kapat

    // Toastify bildirimi göster
    toast.success("Değişiklikler başarıyla kaydedildi!", {
      position: "top-right",
      autoClose: 3000, // 3 saniye sonra otomatik kapanır
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    const savedAdminData = localStorage.getItem("adminData");
    if (savedAdminData) {
      setAdmin(JSON.parse(savedAdminData));
    }
  }, [setAdmin]);

  //neden gelmedi bilgisi için modal
  const handleExplanationClick = (explanation) => {
    setModalExplanation(explanation);
    setModalIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center text-[14px] sm:text-[16px]">
      <div className="flex flex-col items-center justify-center sm:flex-row gap-6 sm:gap-24 mb-8 sm:mb-12 text-sm sm:text-md">
        <EmployeeFilter employees={filteredEmployees} />
        <DateFilterPage handleFilterChange={handleFilterChange} />
      </div>
      <div className="flex justify-evenly w-full mb-4">
        <button onClick={goToPreviousWeek}>
          <FaRegArrowAltCircleLeft className="text-blue-400 w-6 h-6 hover:text-indigo-600 transition duration-300 ease-in-out transform  hover:scale-110" />
        </button>
        <h2 className="text-xl font-semibold text-gray-600">
          {currentDate.toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
          })}
        </h2>
        <button onClick={goToNextWeek}>
          <FaRegArrowAltCircleRight className="text-blue-400 w-6 h-6 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-110" />
        </button>
      </div>

      {/* Table */}
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
                className={`border border-gray-300 px-4 py-2 text-gray-600 text-sm
                }`}
              >
                <p>{date.toLocaleDateString("tr-TR", { weekday: "short" })}</p>
                <p>{date.toLocaleDateString("tr-TR")}</p>
              </th>
            ))}
          </tr>
          <tr></tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-3">
                <input
                  type="checkbox"
                  checked={selectedEmployees[employee.id] || false}
                  onChange={() => toggleEmployeeSelect(employee.id)}
                />
              </td>

              <td className="flex bg-blue-200 border px-4 py-2 flex items-center justify-center  font-semibold text-gray-800 hover:text-blue-500 text-[14px] sm:text-[16px] ">
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
                    className={`border border-gray-300 xl:p-2 ${getCellBackgroundColor(
                      employee.id,
                      date.toISOString().split("T")[0]
                    )}`}
                  >
                    <div className="flex flex-row gap-2 items-center justify-center ">
                      <p>{attendanceStatus}</p>
                      {attendanceStatus === "Gelmedi" && explanation && (
                        <div className="relative">
                          <FcAbout
                            className="cursor-pointer hover:scale-105"
                            size={20}
                            title={explanation}
                            onClick={() => handleExplanationClick(explanation)}
                          />
                          <ExplanationModal
                            explanation={modalExplanation}
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                          />
                        </div>
                      )}

                      {attendanceStatus && allowPastAndFutureChanges ? (
                        // Eğer allowPastAndFutureChanges true ise, her gün için edit simgesini göster
                        <button
                          id="editicon"
                          onClick={() => handleEditClick(employee.id, date)}
                        >
                          <TbEditCircle className="text-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500 w-5 h-5" />
                        </button>
                      ) : date.toDateString() === new Date().toDateString() &&
                        attendanceStatus ? (
                        // Eğer allowPastAndFutureChanges false ise, sadece mevcut gün için edit simgesini göster
                        <button
                          onClick={() => handleEditClick(employee.id, date)}
                        >
                          <TbEditCircle className="text-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500 w-5 h-5" />
                        </button>
                      ) : null}
                      {editMode[`${employee.id}_${date}`] && (
                        <EditForm
                          handleClose={endEditMode}
                          handleSaveAttendance={handleSaveAttendance}
                          employeeId={employee.id}
                          date={date}
                        />
                      )}

                      {attendanceStatus === "" &&
                        !editMode[`${employee.id}_${date}`] &&
                        isClickable && (
                          <Formik
                            initialValues={{ status: "", explanation: "" }}
                            onSubmit={(values, { setSubmitting }) => {
                              // Formu backend'e gönder
                              handleSaveAttendance(employee.id, date, values);
                              setSubmitting(false);
                            }}
                          >
                            {({ values, setFieldValue }) => (
                              <Form className="flex flex-row gap-2 text-sm">
                                <Field
                                  className="w-[85px]  rounded-sm border border-indigo-400 text-gray-700 outline-none hover:border-indigo-600 p-1 "
                                  as="select"
                                  name="status"
                                  onChange={(e) => {
                                    setFieldValue("status", e.target.value);
                                    if (e.target.value === "Gelmedi") {
                                      setFieldValue("explanationVisible", true);
                                      setDropdownVisible(true); // Dropdown menüyü göster
                                    } else {
                                      setFieldValue(
                                        "explanationVisible",
                                        false
                                      );
                                      setDropdownVisible(false); // Dropdown menüyü gizle
                                    }
                                  }}
                                >
                                  <option value="">Boş</option>
                                  <option value="Geldi">Geldi</option>
                                  <option value="Gelmedi">Gelmedi</option>
                                  <option value="İzinli">İzinli</option>
                                </Field>
                                {values.explanationVisible && (
                                  <div className="flex items-center relative gap-1">
                                    <FcAddDatabase
                                      onClick={() =>
                                        setDropdownVisible((prevState) => ({
                                          ...prevState,
                                          [employee.id]:
                                            !prevState[employee.id],
                                        }))
                                      }
                                      className="cursor-pointer w-6 h-6 hover:scale-105"
                                      size={20}
                                    />
                                    {dropdownVisible[employee.id] && (
                                      <div className="dropdown-menu absolute top-8 -right-6 md:-right-[320px] z-10 ">
                                        <div className="bg-slate-50 px-4 py-6 border border-gray-300 shadow-2xl rounded-md flex flex-row gap-3">
                                          <Field
                                            className="flex gap-4 border-2 border-blue-300 rounded-md px-2 py-1 hover:border-indigo-400 outline-none"
                                            type="text"
                                            name="explanation"
                                            placeholder="Neden Gelmedi?"
                                          />
                                          <button
                                            className="absolute top-2 right-2 text-red-500 text-2xl hover:scale-105"
                                            onClick={() => {
                                              setDropdownVisible(false); // Dropdown menüyü kapat
                                            }}
                                          >
                                            <IoMdClose />
                                          </button>
                                          <button
                                            className="border border-gray-300 px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 mr-6"
                                            onClick={() => {
                                              setDropdownVisible(false); // Dropdown menüyü kapat
                                            }}
                                          >
                                            Ekle
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div>
                                  <button
                                    id="checkbutton"
                                    type="submit"
                                    className="transition duration-300 ease-in-out transform hover:scale-110"
                                  >
                                    <FcCheckmark className="w-5 h-5 stroke-2 text-green-700 hover:text-green-500" />
                                  </button>
                                </div>
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

      <div>
        <button
          className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-2 rounded-full mt-5 font-medium transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSaveChanges}
        >
          Kaydet
        </button>
        <ConfirmModal
          show={showConfirmModal}
          handleClose={handleCloseConfirmModal}
          confirmSaveChanges={confirmSaveChanges}
        />
      </div>
      <div className="flex flex-row items-center justify-center mt-5">
        <button
          id="enterattendancebutton"
          className=" flex flex-row bg-gradient-to-r from-blue-600 to-indigo-700  text-white pl-6 pr-8 py-2 rounded-full font-medium transition duration-300 ease-in-out transform hover:scale-105 relative"
          type="button"
          onClick={handleOpenPopup}
          disabled={
            isAttendanceButtonDisabled ||
            (!allowPastAndFutureChanges &&
              !weekDates.some(
                (date) => date.toDateString() === new Date().toDateString()
              ))
          }
          style={{ display: isAttendanceButtonDisabled ? "none" : "block" }} // Burada eklenen kısım
        >
          <span className="mr-5">Yoklama Gir</span>
          <span className="absolute -top-1 -right-2 text-white bg-gradient-to-r from-blue-600 to-indigo-700 p-3 border-4 border-white rounded-full transition duration-300 ease-in-out transform hover:scale-110">
            <FaPlus />
          </span>
        </button>

        {showPopup && (
          <AttendancePopup
            popupEmployeeNames={popupEmployeeNames}
            handleClosePopup={handleClosePopup}
            handleSaveAttendance={handleSaveAttendance}
            currentDate={currentDate}
          />
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default GeneralCalendar;
