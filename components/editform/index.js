import React from "react";
import { Formik, Form, Field } from "formik";

const EditForm = ({ handleClose }) => {
  return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md w-96 " style={{ boxShadow: "0 0 4px #cbd5e1" }}>
          <h2 className="text-lg font-semibold mb-4">
            Yoklama Bilgisini Düzenle
          </h2>
          <Formik
            initialValues={{ status: "", explanation: "" }}
            onSubmit={(values) => {
              handleClose();
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
                    className="px-4 mt-4 py-2 bg-blue-500 text-white rounded-full"
                    type="submit"
                  >
                    Kaydet
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 font-medium hover:scale-105"
                    onClick={handleClose}
                  >
                    Kapat
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default EditForm;
