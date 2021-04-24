import React from 'react';
import { Field, ErrorMessage } from 'formik';

type TextFieldProps = {
  label: string;
  type: 'text' | 'number';
  name: string;
  placeholder: string;
};

const TextField = ({ label, type, name, placeholder }: TextFieldProps) => (
  <>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <Field
        type={type}
        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
        name={name}
        id={name}
        placeholder={placeholder || ''}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <p className="mt-2 text-sm text-red-600">{msg}</p>}
      />
    </div>
  </>
);

export default TextField;
