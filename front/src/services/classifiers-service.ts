import axios from 'axios';
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
    name: 'Naïve Bayésienne',
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
        max: 100,
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

  return finalClassifierResult;
}
