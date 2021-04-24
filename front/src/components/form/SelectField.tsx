import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { SelectParamOption } from '../../models/ClassifierParam';

type SelectFieldProps = {
  label: string;
  name: string;
  options: SelectParamOption[]
};

const SelectField = ({ label, name, options }: SelectFieldProps) => (
  <>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <Field
      as="select"
      id={name}
      name={name}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    >
      <option value="''">Choisir une valeur</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} label={option.label} />
      ))}
    </Field>
    <ErrorMessage
      name={name}
      render={(msg) => <p className="mt-2 text-sm text-red-600">{msg}</p>}
    />
  </>
);

export default SelectField;
