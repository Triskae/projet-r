import Card from "../components/Card";
import { useParams } from 'react-router-dom';
import PageHeader from "../components/PageHeader";
import { getClassifier, getClassifierDefaultFormData } from "../services/classifiers-service";
import { BooleanParam, NumberParam, ParamType, RangeParam, SelectParam, TextParam } from "../models/ClassifierParam";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import Form, { REQUIRED_FORM_FIELD_MESSAGE } from "../components/form/Form";
import TextField from "../components/form/TextField";
import SelectField from "../components/form/SelectField";
import Table from "../components/Table";
import Button from "../components/Button";
import CheckboxField from "../components/form/CheckboxField";
import RangeField from "../components/form/RangeField";

interface ParamTypes {
  classifierId: string;
}

const Classifier = () => {
  let {classifierId} = useParams<ParamTypes>();
  const classifier = getClassifier(classifierId);
  const classifierFormData = getClassifierDefaultFormData(classifier);
  const [classifierValidationSchema, setClassifierValidationSchema] = useState({} as Record<string, any>);

  useEffect(() => {
    initValidationSchemaForm(classifier.params);
  }, [classifier]);

  const initValidationSchemaForm = (form: Record<string, SelectParam | TextParam | NumberParam | BooleanParam | RangeParam>) => {
    let _classifierValidationSchema = {} as Record<string, any>;

    for (let key of Object.keys(form)) {

      switch (form[key].type) {
        case ParamType.TEXT:
          _classifierValidationSchema[key] = Yup
            .string()
            .required(REQUIRED_FORM_FIELD_MESSAGE);
          break;
        case ParamType.NUMBER:
          _classifierValidationSchema[key] = Yup
            .number()
            .required(REQUIRED_FORM_FIELD_MESSAGE);
          break;
        case ParamType.SELECT:
          _classifierValidationSchema[key] = Yup
            .string()
            .oneOf((form[key] as SelectParam).options.map(o => o.value))
            .required(REQUIRED_FORM_FIELD_MESSAGE);
          break;
      }
    }

    setClassifierValidationSchema(Yup.object().shape({..._classifierValidationSchema}));
  }

  const getFormElement = (elName: string, elSchema: SelectParam | TextParam | NumberParam | BooleanParam | RangeParam) => {
    const props = {
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
        return <SelectField label={props.label} name={props.name} options={props.options}/>;
      case ParamType.TEXT:
        return <TextField label={props.label} type="text" name={props.name} placeholder={props.placeholder}/>;
      case ParamType.NUMBER:
        return <TextField label={props.label} type="number" name={props.name} placeholder={props.placeholder}/>;
      case ParamType.BOOLEAN:
        return <CheckboxField label={props.label} name={props.name}/>;
      case ParamType.RANGE:
        return <RangeField label={props.label} name={props.name} min={props.min} max={props.max} step={props.step}/>;
      default:
        return null;
    }
  }

  const onSubmit = (values: any) => {
    console.log(values);
  }

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
              {Object.keys(classifier.params).map((key, ind) => (
                <div key={key + ind}>
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
