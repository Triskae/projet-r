import React from 'react';
import { Field } from 'formik';

type CheckboxFieldProps = {
  label: string;
  name: string;
};

const CheckboxField = ({ label, name }: CheckboxFieldProps) => (
  <>
    <div className="flex items-center">
      <Field
        id={name}
        name={name}
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  </>
);

export default CheckboxField;
