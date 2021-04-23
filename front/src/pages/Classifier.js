import React from 'react';
import Card from "../components/Card";
import { useParams } from 'react-router-dom';
import PageHeader from "../components/PageHeader";
import { classifiers } from "../services/classifiers-service";

const Classifier = () => {
  let {classifierId} = useParams();
  const classifier = classifiers.find(classifier => classifier.id === classifierId);

  return (
    <div>
      <PageHeader displayBackButton>{classifier.name}</PageHeader>
      <Card>
        <div>
          <h2>{classifierId}</h2>
          {classifier.form.map(formInput => {
            switch (formInput.type) {
              case 'select':
                return (
                  <div>
                    <label htmlFor={classifier.id} className="block text-sm font-medium text-gray-700">
                      {formInput.label}
                    </label>
                    <select
                      id={classifier.id}
                      name={classifier.id}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      defaultValue={formInput.defaultOption}
                    >
                      {formInput.options.map(option => <option>{option}</option>)}
                    </select>
                  </div>
                )
            }
          })}
        </div>
      </Card>
    </div>
  );
};

export default Classifier;
