import React from 'react';
import { Field, FieldProps } from 'formik';
import ReactSlider from 'react-slider';
import classNames from 'classnames';

interface RangeFieldProps {
  label: string;
  name: string;
  min: number;
  max: number;
  step: number;
}

interface FormValues {
  title: string
}

const RangeField = ({ label, name, min, max, step }: RangeFieldProps) => (
  <div className="mb-8">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-4">
      <Field
        name={name}
        id={name}
      >
        {({ field, form }: FieldProps<FormValues>) => {
          const fieldValue = parseInt(JSON.stringify(field.value), 10);
          const handleChange = (value: number) => form.setFieldValue(name, value);
          const trackClassName = (index: number) => classNames({
            'h-3 rounded-full': true,
            'bg-blue-500': index === 0,
            'bg-gray-200': index === 1
          });

          return (
            <ReactSlider
              min={min}
              max={max}
              onChange={(value) => handleChange(value)}
              renderThumb={
                (props: any, state: { index: number; value: number; valueNow: number }) => (
                  <div {...props}>{state.valueNow}</div>)
              }
              defaultValue={fieldValue}
              step={step}
              thumbClassName="bg-blue-600 h-8 w-8 flex cursor-grab items-center justify-center text-white text-xs rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 -top-2.5"
              renderTrack={
                (props, state) => (<div {...props} className={trackClassName(state.index)} />)
              }
            />
          );
        }}
      </Field>
    </div>
  </div>
);

export default RangeField;
