import { BooleanParam, NumberParam, RangeParam, SelectParam, TextParam } from './ClassifierParam';
import { Dataset } from './Dataset';

export interface Classifier {
  id: string;
  name: string;
  endpoint: string;
  params: Record<string, (SelectParam | TextParam | NumberParam | BooleanParam | RangeParam)>
}

export interface ClassifierParamValues {
  [key: string]: string | number;
}

export interface ConfusionMatrix {
  [key: string]: number[];
}

export interface ClassifierResult {
  'classifierId': string;
  'date': Date;
  'AUC': number;
  'accuracy': number;
  'image': string;
  'dataEtPrediction': Dataset;
  'dataNewPrediction': Dataset;
  'confusionMatrix': ConfusionMatrix
}
