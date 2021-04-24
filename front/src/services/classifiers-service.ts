import { Classifier } from "../models/Classifier";
import {
  BooleanParam,
  NumberParam,
  ParamType,
  SelectParam,
  SelectParamOption
} from "../models/ClassifierParam";

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
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '5, 10, 15, ...'
      } as NumberParam,
      arg3: {
        type: ParamType.SELECT,
        label: 'Couleur',
        options: [
          {label: 'Rouge', value: 'red'},
          {label: 'Vert', value: 'green'},
          {label: 'Bleu', value: 'blue'},
          {label: 'Jaune', value: 'Yellow'},
          {label: 'Blanc', value: 'white'},
          {label: 'Noir', value: 'black'},
          {label: 'Violet', value: 'purple'},
          {label: 'Orange', value: 'orange'},
        ] as SelectParamOption[],
      } as SelectParam
    }
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    params: {
      arg1: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '300, 500, 700, ...'
      } as NumberParam,
      arg2: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '3, 5, 7, ...'
      } as NumberParam,
      arg3: {
        type: ParamType.SELECT,
        label: 'Couleur',
        options: [
          {label: 'Rouge', value: 'red'},
          {label: 'Vert', value: 'green'},
          {label: 'Bleu', value: 'blue'},
          {label: 'Jaune', value: 'Yellow'},
          {label: 'Blanc', value: 'white'},
          {label: 'Noir', value: 'black'},
          {label: 'Violet', value: 'purple'},
          {label: 'Orange', value: 'orange'},
        ] as SelectParamOption[],
      } as SelectParam
    }
  },
  {
    id: 'k-nearest-neighbors',
    name: 'K-Nearest Neighbors',
    params: {
      arg1: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '10, 20, 30, ...'
      } as NumberParam,
      arg2: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '5, 10, 15, ...'
      } as NumberParam,
      arg3: {
        type: ParamType.SELECT,
        label: 'Couleur',
        options: [
          {label: 'Rouge', value: 'red'},
          {label: 'Vert', value: 'green'},
          {label: 'Bleu', value: 'blue'},
          {label: 'Jaune', value: 'Yellow'},
          {label: 'Blanc', value: 'white'},
          {label: 'Noir', value: 'black'},
          {label: 'Violet', value: 'purple'},
          {label: 'Orange', value: 'orange'},
        ] as SelectParamOption[],
      } as SelectParam
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
      arg2: {
        type: ParamType.SELECT,
        label: 'Couleur',
        options: [
          {label: 'Rouge', value: 'red'},
          {label: 'Vert', value: 'green'},
          {label: 'Bleu', value: 'blue'},
          {label: 'Jaune', value: 'Yellow'},
          {label: 'Blanc', value: 'white'},
          {label: 'Noir', value: 'black'},
          {label: 'Violet', value: 'purple'},
          {label: 'Orange', value: 'orange'},
        ] as SelectParamOption[],
      } as SelectParam
    }
  },
  {
    id: 'naive-bayes',
    name: 'Naive Bayes',
    params: {
      arg1: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '0, 20, 40, ...'
      } as NumberParam,
      arg2: {
        type: ParamType.BOOLEAN,
        label: 'Checkbox'
      } as BooleanParam,
      arg3: {
        type: ParamType.BOOLEAN,
        label: 'Checkbox'
      } as BooleanParam,
      arg4: {
        type: ParamType.SELECT,
        label: 'Couleur',
        options: [
          {label: 'Rouge', value: 'red'},
          {label: 'Vert', value: 'green'},
          {label: 'Bleu', value: 'blue'},
          {label: 'Jaune', value: 'Yellow'},
          {label: 'Blanc', value: 'white'},
          {label: 'Noir', value: 'black'},
          {label: 'Violet', value: 'purple'},
          {label: 'Orange', value: 'orange'},
        ] as SelectParamOption[],
      } as SelectParam
    }
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    params: {
      arg1: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '25, 50, 75, ...'
      } as NumberParam,
      arg2: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '0.01, 0.001, 0.0001, ...'
      } as NumberParam,
      arg3: {
        type: ParamType.NUMBER,
        label: 'Nombre',
        placeholder: '100, 300, 500, ...'
      } as NumberParam,
      arg4: {
        type: ParamType.SELECT,
        label: 'Couleur',
        options: [
          {label: 'Rouge', value: 'red'},
          {label: 'Vert', value: 'green'},
          {label: 'Bleu', value: 'blue'},
          {label: 'Jaune', value: 'Yellow'},
          {label: 'Blanc', value: 'white'},
          {label: 'Noir', value: 'black'},
          {label: 'Violet', value: 'purple'},
          {label: 'Orange', value: 'orange'},
        ] as SelectParamOption[],
      } as SelectParam
    }
  }
] as Classifier[];

export function getClassifierDefaultFormData(classifier: Classifier): Record<string, string> {
  let classifierFormData = {} as Record<string, any>;
  for (let key of Object.keys(classifier.params)) {
    if (classifier.params[key].type === ParamType.BOOLEAN) {
      classifierFormData[key] = false;
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
