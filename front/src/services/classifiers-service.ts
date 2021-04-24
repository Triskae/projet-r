import { Classifier } from "../models/Classifier";
import {
  BooleanParam,
  ParamType, RangeParam,
  SelectParam,
  SelectParamOption
} from "../models/ClassifierParam";

const curveColorsSelect = {
  type: ParamType.SELECT,
  label: 'Couleur de la courbe',
  options: [
    {label: 'Marron', value: 'burlywood4'},
    {label: 'Vert lagon', value: 'aquamarine'},
    {label: 'Bleu', value: 'blue'},
    {label: 'Jaune', value: 'darkgoldenrod1'},
    {label: 'Gris taupe', value: 'mistyrose4'},
    {label: 'Noir', value: 'black'},
    {label: 'Violet', value: 'purple'},
    {label: 'Orange', value: 'orange'},
  ] as SelectParamOption[],
} as SelectParam;

const classifiers = [
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    params: {
      arg1: {
        type: ParamType.SELECT,
        label: 'Algorithme',
        options: [
          {label: 'Gini', value: 'gini'},
          {label: 'Information', value: 'information'},
        ] as SelectParamOption[],
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
    name: 'Random Forest',
    params: {
      arg1: {
        type: ParamType.RANGE,
        label: `Nombre d'arbres`,
        min: 0,
        max: 500,
        step: 1
      } as RangeParam,
      arg2: {
        type: ParamType.RANGE,
        label: `Nombre de variables testées`,
        min: 0,
        max: 10,
        step: 0.1
      } as RangeParam,
      arg3: curveColorsSelect
    }
  },
  {
    id: 'k-nearest-neighbors',
    name: 'K-Nearest Neighbors',
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
    name: 'Support Vector Machine',
    params: {
      arg1: {
        type: ParamType.SELECT,
        label: 'Noyau',
        options: [
          {label: 'Linéaire', value: 'linear'},
          {label: 'Polynomial', value: 'polynomial'},
          {label: 'Radial', value: 'radial'},
          {label: 'Sigmoïde', value: 'sigmoid'}
        ] as SelectParamOption[],
      } as SelectParam,
      arg2: curveColorsSelect
    }
  },
  {
    id: 'naive-bayes',
    name: 'Naive Bayes',
    params: {
      arg1: {
        type: ParamType.RANGE,
        label: 'Estimateur de Laplace',
        min: 0,
        max: 20,
        step: 0.1
      } as RangeParam,
      arg2: {
        type: ParamType.BOOLEAN,
        label: 'Utiliser le noyau'
      } as BooleanParam,
      arg3: curveColorsSelect
    }
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
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
        label: 'Decay',
        min: 0,
        max: 1,
        step: 0.0001
      } as RangeParam,
      arg3: {
        type: ParamType.RANGE,
        label: `Nombre d'itérations`,
        min: 0,
        max: 500,
        step: 1
      } as RangeParam,
      arg4: curveColorsSelect
    }
  }
] as Classifier[];

export function getClassifierDefaultFormData(classifier: Classifier): Record<string, string> {
  let classifierFormData = {} as Record<string, any>;
  for (let key of Object.keys(classifier.params)) {
    const foundClassifier = classifier.params[key];
    if (foundClassifier.type === ParamType.BOOLEAN) {
      classifierFormData[key] = false;
    } else if (foundClassifier.type === ParamType.RANGE) {
      classifierFormData[key] = foundClassifier.max - ((foundClassifier.max - foundClassifier.min) / 2);
    } else {
      classifierFormData[key] = '';
    }
  }
  return classifierFormData;
}

export function getClassifiers(): Classifier[] {
  return classifiers;
}

export function getClassifier(classifierId: string): Classifier {
  return classifiers[classifiers.findIndex(classifier => classifier.id === classifierId)];
}
