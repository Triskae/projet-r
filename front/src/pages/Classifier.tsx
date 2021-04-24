import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { getClassifier, getClassifierDefaultFormData } from '../services/classifiers-service';
import {
  ClassifierParam,
  NumberParam,
  ParamType,
  RangeParam,
  SelectParam,
  TextParam
} from '../models/ClassifierParam';
import Form, { REQUIRED_FORM_FIELD_MESSAGE } from '../components/form/Form';
import TextField from '../components/form/TextField';
import SelectField from '../components/form/SelectField';
import Table from '../components/Table';
import Button from '../components/Button';
import CheckboxField from '../components/form/CheckboxField';
import RangeField from '../components/form/RangeField';

interface ParamTypes {
  classifierId: string;
}

const Classifier = () => {
  const { classifierId } = useParams<ParamTypes>();
  const classifier = getClassifier(classifierId);
  const classifierFormData = getClassifierDefaultFormData(classifier);
  const [
    classifierValidationSchema,
    setClassifierValidationSchema
  ] = useState({} as Record<string, any>);

  const initValidationSchemaForm = (form: Record<string, ClassifierParam>) => {
    const finalClassifierValidationSchema = {} as Record<string, any>;

    Object.keys(form).forEach((key) => {
      switch (form[key].type) {
        case ParamType.TEXT:
          finalClassifierValidationSchema[key] = Yup
            .string()
            .required(REQUIRED_FORM_FIELD_MESSAGE);
          break;
        case ParamType.NUMBER:
          finalClassifierValidationSchema[key] = Yup
            .number()
            .required(REQUIRED_FORM_FIELD_MESSAGE);
          break;
        case ParamType.SELECT:
          finalClassifierValidationSchema[key] = Yup
            .string()
            .oneOf((form[key] as SelectParam).options.map((o) => o.value))
            .required(REQUIRED_FORM_FIELD_MESSAGE);
          break;
        default:
          break;
      }
    });

    setClassifierValidationSchema(Yup.object().shape({ ...finalClassifierValidationSchema }));
  };

  useEffect(() => {
    initValidationSchemaForm(classifier.params);
  }, [classifier]);

  const getFormElement = (elName: string, elSchema: ClassifierParam) => {
    const elProps = {
      name: elName,
      label: elSchema.label,
      options: (elSchema as SelectParam).options,
      placeholder: (elSchema as TextParam | NumberParam).placeholder,
      min: (elSchema as RangeParam).min,
      max: (elSchema as RangeParam).max,
      step: (elSchema as RangeParam).step
    };

    switch (elSchema.type) {
      case ParamType.SELECT:
        return <SelectField label={elProps.label} name={elProps.name} options={elProps.options} />;
      case ParamType.TEXT:
        return (
          <TextField
            label={elProps.label}
            type="text"
            name={elProps.name}
            placeholder={elProps.placeholder}
          />
        );
      case ParamType.NUMBER:
        return (
          <TextField
            label={elProps.label}
            type="number"
            name={elProps.name}
            placeholder={elProps.placeholder}
          />
        );
      case ParamType.BOOLEAN:
        return <CheckboxField label={elProps.label} name={elProps.name} />;
      case ParamType.RANGE:
        return (
          <RangeField
            label={elProps.label}
            name={elProps.name}
            min={elProps.min}
            max={elProps.max}
            step={elProps.step}
          />
        );
      default:
        return null;
    }
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <PageHeader displayBackButton>{classifier.name}</PageHeader>
      <Card>
        <div>
          <h2>Rappel du dataset</h2>
          <Table headers={['Donnée A', 'Donnée B']} className="pb-6">
            <tr>
              <td>Valeur 1</td>
              <td>Valeur 2</td>
            </tr>
            <tr>
              <td>Valeur 3</td>
              <td>Valeur 4</td>
            </tr>
          </Table>
          <h2>Choix des variables</h2>
          <Form
            initialValues={classifierFormData}
            validationSchema={classifierValidationSchema}
            onSubmit={onSubmit}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(classifier.params).map((key) => (
                <div key={key}>
                  {getFormElement(key, classifier.params[key])}
                </div>
              ))}
            </div>
            <Button className="mt-12 w-fit">Prédire un résultat</Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Classifier;
