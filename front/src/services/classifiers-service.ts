import axios from 'axios';
import { useState } from 'react';
import { Classifier, ClassifierParamValues, ClassifierResult } from '../models/Classifier';
import {
  BooleanParam,
  ParamType, RangeParam,
  SelectParam,
  SelectParamOption
} from '../models/ClassifierParam';
import getConfiguration from '../project-config';
import { formatFetchedDataset } from './dataset.service';

const baseApiURL = getConfiguration().apiBaseURL;

const curveColorsSelect = {
  type: ParamType.SELECT,
  label: 'Couleur de la courbe',
  options: [
    { label: 'Marron', value: 'burlywood4' },
    { label: 'Vert lagon', value: 'aquamarine' },
    { label: 'Bleu', value: 'blue' },
    { label: 'Jaune', value: 'darkgoldenrod1' },
    { label: 'Gris taupe', value: 'mistyrose4' },
    { label: 'Noir', value: 'black' },
    { label: 'Violet', value: 'purple' },
    { label: 'Orange', value: 'orange' }
  ] as SelectParamOption[]
} as SelectParam;

const classifiers = [
  {
    id: 'decision-tree',
    name: 'Arbre de décisions',
    endpoint: 'rpart',
    params: {
      arg1: {
        type: ParamType.SELECT,
        label: 'Algorithme',
        options: [
          { label: 'Gini', value: 'gini' },
          { label: 'Information', value: 'information' }
        ] as SelectParamOption[]
      } as SelectParam,
      arg2: {
        type: ParamType.RANGE,
        label: 'Distance',
        min: 0,
        max: 20,
        step: 0.1
      } as RangeParam,
      arg3: curveColorsSelect
    }
  },
  {
    id: 'random-forest',
    name: 'Forêt d\'arbres décisionnels',
    endpoint: 'rf',
    params: {
      arg1: {
        type: ParamType.RANGE,
        label: 'Nombre d\'arbres',
        min: 0,
        max: 500,
        step: 1
      } as RangeParam,
      arg2: {
        type: ParamType.RANGE,
        label: 'Nombre de variables testées',
        min: 0,
        max: 10,
        step: 0.1
      } as RangeParam,
      arg3: curveColorsSelect
    }
  },
  {
    id: 'k-nearest-neighbors',
    name: 'K plus proches voisins',
    endpoint: 'kknn',
    params: {
      arg1: {
        type: ParamType.RANGE,
        label: 'Nombre de voisins',
        min: 0,
        max: 20,
        step: 0.1
      } as RangeParam,
      arg2: {
        type: ParamType.RANGE,
        label: 'Distance de Minkowski',
        min: 0,
        max: 10,
        step: 0.1
      } as RangeParam,
      arg3: curveColorsSelect
    }
  },
  {
    id: 'support-vector-machine',
    name: 'Machine à vecteurs de support',
    endpoint: 'svm',
    params: {
      arg1: {
        type: ParamType.SELECT,
        label: 'Noyau',
        options: [
          { label: 'Linéaire', value: 'linear' },
          { label: 'Polynomial', value: 'polynomial' },
          { label: 'Radial', value: 'radial' },
          { label: 'Sigmoïde', value: 'sigmoid' }
        ] as SelectParamOption[]
      } as SelectParam,
      arg2: curveColorsSelect
    }
  },
  {
    id: 'naive-bayes',
    name: 'Naïve Bayésien',
    endpoint: 'nb',
    params: {
      arg1: {
        type: ParamType.RANGE,
        label: 'Estimateur de Laplace',
        min: 0,
        max: 20,
        step: 0.1
      } as RangeParam,
      arg3: curveColorsSelect,
      arg2: {
        type: ParamType.BOOLEAN,
        label: 'Utiliser le noyau'
      } as BooleanParam
    }
  },
  {
    id: 'neural-network',
    name: 'Réseau de neurones artificiels',
    endpoint: 'nnet',
    params: {
      arg1: {
        type: ParamType.RANGE,
        label: 'Taille',
        min: 0,
        max: 50,
        step: 1
      } as RangeParam,
      arg2: {
        type: ParamType.RANGE,
        label: 'Dégradation',
        min: 0,
        max: 1,
        step: 0.0001
      } as RangeParam,
      arg3: {
        type: ParamType.RANGE,
        label: 'Nombre d\'itérations',
        min: 0,
        max: 500,
        step: 1
      } as RangeParam,
      arg4: curveColorsSelect
    }
  }
] as Classifier[];

export function getClassifierDefaultFormData(classifier: Classifier): Record<string, string> {
  const classifierFormData = {} as Record<string, any>;
  Object.keys(classifier.params).forEach((key) => {
    const foundClassifier = classifier.params[key];
    if (foundClassifier.type === ParamType.BOOLEAN) {
      classifierFormData[key] = false;
    } else if (foundClassifier.type === ParamType.RANGE) {
      // eslint-disable-next-line max-len
      classifierFormData[key] = foundClassifier.max - ((foundClassifier.max - foundClassifier.min) / 2);
    } else {
      classifierFormData[key] = '';
    }
  });
  return classifierFormData;
}

export function getClassifiers(): Classifier[] {
  return classifiers;
}

export function getClassifier(classifierId: string): Classifier {
  return classifiers[classifiers.findIndex((classifier) => classifier.id === classifierId)];
}

export async function getClassifierResult(
  classifierId: string,
  paramValues: ClassifierParamValues
): Promise<ClassifierResult> {
  const classifier = getClassifier(classifierId);
  const response = await axios.get(`${baseApiURL}/classifier/${classifier.endpoint}`, {
    params: paramValues
  });
  const fetchedClassifierResult = response.data;

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    dataEtPrediction = [],
    dataNewPrediction = [],
    ...finalClassifierResult
  } = { ...fetchedClassifierResult };

  finalClassifierResult.dataEtPrediction = formatFetchedDataset(dataEtPrediction);
  finalClassifierResult.dataNewPrediction = formatFetchedDataset(dataNewPrediction);

  (finalClassifierResult as ClassifierResult).classifierId = classifierId;
  (finalClassifierResult as ClassifierResult).date = new Date();

  return finalClassifierResult;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export function getSavedClassifierResults(): ClassifierResult[] {
  const classifierResults = [] as ClassifierResult[];
  classifiers.forEach((classifier) => {
    const savedClassifierResult = localStorage.getItem(`${classifier.id}-save`);
    if (savedClassifierResult) {
      classifierResults.push(JSON.parse(savedClassifierResult) as ClassifierResult);
    }
  });
  return classifierResults;
}

export function getSavedClassifierResult(classifierId: string): ClassifierResult | null {
  const item = localStorage.getItem(`${classifierId}-save`);
  if (item) {
    return JSON.parse(item) as ClassifierResult;
  }
  return null;
}
