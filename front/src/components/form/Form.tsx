import { Formik, Form as FormikForm } from 'formik';
import React from 'react';
import { FormikHelpers } from "formik/dist/types";

export const REQUIRED_FORM_FIELD_MESSAGE = 'Cette variable est requise pour que la prédiction se fasse correctement';

type FormProps = {
  initialValues: Record<string, string>;
  validationSchema: Record<string, any>;
  onSubmit: ((values: any, formikHelpers: FormikHelpers<any>) => void);
  children: React.ReactNode
}

const Form = ({initialValues, validationSchema, onSubmit, children}: FormProps) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm className="needs-validation">
        {children}
      </FormikForm>
    </Formik>
  );
};

export default Form;
