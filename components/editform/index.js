"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";import { IoMdClose } from "react-icons/io";

const EditForm = ({ handleClose, handleSaveAttendance, employeeId, date }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    handleClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative" style={{ boxShadow: "0 0 4px #cbd5e1" }}>
        <div className="absolute top-2 right-2">
          <button
            onClick={closeModal}
            className="text-red-500 hover:text-red-700 hover:scale-110"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
         <h2 className="text-lg font-semibold mb-4">
            Yoklama Bilgisini Düzenle
          </h2>
        <Formik
          initialValues={{ status: "", explanation: "" }}
          onSubmit={(values, { setSubmitting }) => {
            // Formu backend'e gönder
            handleSaveAttendance(employeeId, date, values);
            setSubmitting(false);
            closeModal(); // Form gönderildikten sonra modalı kapat
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-2 text-sm">
              <div className="flex flex-row gap-2 text-sm">
              <Field
                className="w-64 rounded-sm border border-indigo-400 text-gray-700 outline-none hover:border-indigo-600 p-1"
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
              >
                <option value="">Boş</option>
                <option value="Geldi">Geldi</option>
                <option value="Gelmedi">Gelmedi</option>
                <option value="İzinli">İzinli</option>
              </Field>
              
              <div>
                <button
                  id="checkbutton"
                  type="submit"
                  className="hover:scale-105 bg-blue-600 px-4 py-2 rounded-md text-white ml-6"
                >
                  Değiştir
                </button>
              </div>
              </div>
              <div>
              {values.explanationVisible && (
                <Field
                className="flex gap-4 border-2 border-blue-300 rounded-md px-2 py-1 hover:border-indigo-400 outline-none w-full"
                  type="text"
                  name="explanation"
                  placeholder="Neden Gelmedi?"
                />
              )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditForm;
