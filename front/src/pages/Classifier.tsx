import { Link, useParams, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import * as Yup from 'yup';
import { DocumentDownloadIcon } from '@heroicons/react/solid';
import H from '../helpers';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import {
  getClassifier,
  getClassifierDefaultFormData,
  getClassifierResult, getSavedClassifierResult,
  useLocalStorage
} from '../services/classifiers-service';
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
import DatasetTable from '../components/dataset-table/DatasetTable';
import Button from '../components/Button';
import CheckboxField from '../components/form/CheckboxField';
import RangeField from '../components/form/RangeField';
import getDataset from '../services/dataset.service';
import { Dataset } from '../models/Dataset';
import LoadingIndicator from '../components/LoadingIndicator';
import Collapsible from '../components/Collapsible';
import { ClassifierResult } from '../models/Classifier';
import ConfusionMatrixTable from '../components/ConfusionMatrixTable';

interface ParamTypes {
  classifierId: string;
}

const Classifier = () => {
  const { path } = useRouteMatch();
  const route = path.split('/')[1];

  const { classifierId } = useParams<ParamTypes>();
  const classifier = getClassifier(classifierId);
  const classifierFormData = getClassifierDefaultFormData(classifier);
  const [
    classifierValidationSchema,
    setClassifierValidationSchema
  ] = useState({} as Record<string, any>);
  const [dataset, setDataset] = useState({ headers: [], data: [] } as Dataset);
  const [fetchingDataset, setFetchingDataset] = useState(false);
  const [classifierResult, setClassifierResult] = useState<ClassifierResult | null>(null);
  const [fetchingClassifierResult, setFetchingClassifierResult] = useState(false);
  const setSavedClassifierResult = useLocalStorage(`${classifierId}-save`, {})[1];
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
    async function fetchDataset() {
      setFetchingDataset(true);
      const fetchedDataset = await getDataset();
      setFetchingDataset(false);
      setDataset(fetchedDataset);
    }

    fetchDataset();

    if (route === 'predictions') {
      initValidationSchemaForm(classifier.params);
    } else {
      setClassifierResult(getSavedClassifierResult(classifierId));
    }
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

  const onSubmit = async (values: any) => {
    if (classifierResult !== null) {
      setClassifierResult(null);
    }
    setFetchingClassifierResult(true);
    const fetchedClassifierResult = await getClassifierResult(classifier.id, values);
    setFetchingClassifierResult(false);
    setClassifierResult(fetchedClassifierResult);
  };

  return (
    <div>
      <PageHeader displayBackButton>{classifier.name}</PageHeader>
      <Card className="mb-8">
        <div>
          <Collapsible
            collapsibleTitle={route === 'predictions' ? 'Afficher le dataset' : 'Afficher le dataset utilisé pour la prédiction'}
            className="mb-8"
          >
            {fetchingDataset
              ? (
                <div className="flex justify-center">
                  <LoadingIndicator className="mb-8" />
                </div>
              )
              : (
                <DatasetTable
                  height={560}
                  width="100%"
                  itemCount={dataset.data.length}
                  itemSize={52}
                  headers={dataset.headers}
                  rows={dataset.data}
                />
              )}
          </Collapsible>
          {route === 'predictions' && (
            <>
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
                <div className="flex flex-col sm:flex-row mt-12 sm:w-fit sm:mt-12 sticky top-0">
                  <Button className="mr-4" type="submit">
                    Générer un
                    {' '}
                    {classifierResult && <span> nouveau </span>}
                    {' '}
                    modèle
                  </Button>
                  {classifierResult && (
                    <Button
                      className="mt-4 sm:mt-0"
                      btnStyle="secondary"
                      onClick={() => setSavedClassifierResult(classifierResult)}
                    >
                      Sauvegarder ce modèle
                    </Button>
                  )}
                </div>
              </Form>
            </>
          )}
          {route === 'saves' && (
            <Link to={`/predictions/${classifier.id}`} className="overflow-hidden">
              <Button className="w-fit">Générer un nouveau modèle</Button>
            </Link>
          )}
        </div>
      </Card>
      <Card>
        <h2>Modèle généré</h2>
        {(!fetchingClassifierResult && classifierResult === null)
        && (
          <div className="flex justify-center py-4">
            <span>Veuillez lancer une prédiction pour afficher le résultat ici.</span>
          </div>
        )}
        {(fetchingClassifierResult && classifierResult === null)
        && (
          <div className="flex justify-center py-4">
            <LoadingIndicator />
          </div>
        )}
        {
          classifierResult !== null && (
            <div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8 mt-4">
                <div>
                  <h3>
                    Echantillon testé (
                    {classifierResult.dataEtPrediction.data.length}
                    )
                  </h3>
                  <DatasetTable
                    height={300}
                    width="100%"
                    itemCount={classifierResult.dataEtPrediction.data.length}
                    itemSize={52}
                    headers={classifierResult.dataEtPrediction.headers}
                    rows={classifierResult.dataEtPrediction.data}
                  />
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between">
                    <h3 className="pb-0">Modèle appliqué</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const csv = H.jsonToCsv(classifierResult?.dataNewPrediction.data);
                        H.download(csv);
                      }}
                    >
                      <DocumentDownloadIcon className="text-blue-500 w-8 hover:text-blue-600" />
                    </button>
                  </div>
                  <DatasetTable
                    height={300}
                    width="100%"
                    itemCount={classifierResult.dataNewPrediction.data.length}
                    itemSize={52}
                    headers={classifierResult.dataNewPrediction.headers}
                    rows={classifierResult.dataNewPrediction.data}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
                <div>
                  <h3>Courbe</h3>
                  <span>
                    AUC :
                    {' '}
                    {classifierResult.AUC}
                  </span>
                  <img src={`data:image/jpeg;base64,${classifierResult.image}`} alt="courbe" />
                </div>
                <div>
                  <h3>Matrice de confusion</h3>
                  <span>
                    Précision de la matrice de confusion :
                    {' '}
                    {classifierResult.accuracy}
                  </span>
                  <div className="mt-4">
                    <ConfusionMatrixTable confusionMatrix={classifierResult.confusionMatrix} />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Card>
    </div>
  );
};

export default Classifier;
