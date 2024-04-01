import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdClose } from "react-icons/md";

const initialValues = {
  status: "Boş",
  explanation: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.status) {
    errors.status = "Durum alanı boş bırakılamaz.";
  }
  if (values.status === "Gelmedi" && !values.explanation) {
    errors.explanation = "Neden gelmediğini belirtmelisiniz.";
  }
  return errors;
};

const Popup = ({ handleSave, handleClose, employeeId, date }) => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values) => handleSave(employeeId, date, values)}
  >
    {({ values }) => (
      <Form>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 sm:p-8 rounded-md shadow-md w-[340px] sm:w-[400px] md:w-[450px] relative">
            <Field as="select" name="status" className="block w-[120px] border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-4">
              <option value="Boş">Boş</option>
              <option value="Geldi">Geldi</option>
              <option value="Gelmedi">Gelmedi</option>
              <option value="İzinli">İzinli</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500" />
            {values.status === "Gelmedi" && (
              <>
                <Field type="text" name="explanation" placeholder="Neden gelmedi?" className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <ErrorMessage name="explanation" component="div" className="text-red-500" />
              </>
            )}
            <div className="flex justify-end mt-4">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Kaydet</button>
              <button type="button" onClick={handleClose} className="inline-flex justify-center ml-4 py-2 px-4 font-medium rounded-md  text-red-600 hover:text-red-700 absolute top-0 right-0 ">
                <MdClose className="text-2xl " />
              </button>
            </div>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default Popup;

