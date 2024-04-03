"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import useStore from "@/utils/store";

const AttendancePopup = ({
  popupEmployeeNames,
  handleClosePopup,
  handleSaveAttendance,
  currentDate,
}) => {
  const { admin } = useStore.getState();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-4">Yoklama Gir</h2>
        <ul className="mb-4">
          {popupEmployeeNames.map((employee, index) => (
            <li key={index} className="mb-1">
              {employee}
            </li>
          ))}
        </ul>

        {popupEmployeeNames.length > 0 && (
          <Formik
            initialValues={{
              status: "",
              explanation: "",
              explanationVisible: false,
            }}
            onSubmit={(values) => {
              // form submit işlemi
              popupEmployeeNames.forEach((employeeName) => {
                const employeeId = admin.branches
                  .flatMap((branch) => branch.manager.employees)
                  .find((employee) => employee.name === employeeName)?.id;
                if (employeeId) {
                  handleSaveAttendance(employeeId, currentDate, values);
                }
              });
              handleClosePopup();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col gap-4 mt-4">
                <Field
                  className="rounded-sm border border-indigo-400 text-gray-700 outline-none hover:border-indigo-600 p-1"
                  as="select"
                  name="status"
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    if (e.target.value === "Gelmedi") {
                      setFieldValue("explanationVisible", true);
                    } else {
                      setFieldValue("explanationVisible", false);
                    }
                  }}
                  // Seçili duruma göre tablodaki dropdown menüsünün güncellenmesi
                  value={values.status}
                >
                  <option value="">Durum Seçin</option>
                  <option value="Geldi">Geldi</option>
                  <option value="Gelmedi">Gelmedi</option>
                  <option value="İzinli">İzinli</option>
                </Field>

                {values.explanationVisible && (
                  <div className="relative">
                    <Field
                      className="flex gap-4 border-2 border-blue-300 rounded-md px-2 py-1 hover:border-indigo-400 outline-none"
                      type="text"
                      name="explanation"
                      placeholder="Neden Gelmedi?"
                    />
                  </div>
                )}

               <div className="flex flex-row gap-3 justify-end">
               <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 font-medium hover:scale-105"
                  type="submit"
                >
                  Gönder
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 font-medium hover:scale-105"
                  onClick={handleClosePopup}
                >
                  Kapat
                </button>
               </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AttendancePopup;
