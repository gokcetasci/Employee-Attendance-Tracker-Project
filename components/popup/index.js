import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

const Popup = ({ handleSave, handleClose }) => (
  <Formik initialValues={initialValues} validate={validate} onSubmit={handleSave}>
    {({ values }) => (
      <Form>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 sm:p-8 rounded-md shadow-md w-[340px] sm:w-[400px] md:w-[450px]">
            <Field as="select" name="status">
              <option value="Boş">Boş</option>
              <option value="Geldi">Geldi</option>
              <option value="Gelmedi">Gelmedi</option>
              <option value="İzinli">İzinli</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500" />
            {values.status === "Gelmedi" && ( // Sadece "Gelmedi" seçeneği seçildiğinde görünsün
              <>
                <Field type="text" name="explanation" placeholder="Neden gelmedi?" />
                <ErrorMessage name="explanation" component="div" className="text-red-500" />
              </>
            )}
            <button type="submit">Kaydet</button>
            <button type="button" onClick={handleClose}>Kapat</button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);



export default Popup;
