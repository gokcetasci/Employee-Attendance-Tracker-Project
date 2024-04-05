import React from "react";
import { Formik, Form, Field } from "formik";

const EditForm = ({ editEmployeeId, editDate, handleClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <Formik
        initialValues={{ status: "", explanation: "" }}
        onSubmit={(values) => {
          handleClose();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-md shadow-lg">
            <div className="flex flex-col gap-4">
              <label htmlFor="status">Durum:</label>
              <Field
                as="select"
                name="status"
                className="border border-gray-300 p-2 rounded-md"
                onChange={(e) => {
                  setFieldValue("status", e.target.value);
                  if (e.target.value === "Gelmedi") {
                    setFieldValue("explanationVisible", true);
                  } else {
                    setFieldValue("explanationVisible", false);
                  }
                }}
              >
                <option value="">Seçiniz</option>
                <option value="Geldi">Geldi</option>
                <option value="Gelmedi">Gelmedi</option>
                <option value="İzinli">İzinli</option>
              </Field>
              {values.status === "Gelmedi" && (
                <Field
                  type="text"
                  name="explanation"
                  placeholder="Neden Gelmedi?"
                  className="border border-gray-300 p-2 rounded-md"
                />
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                  onClick={handleClose}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
