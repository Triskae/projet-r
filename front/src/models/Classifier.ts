import { BooleanParam, NumberParam, RangeParam, SelectParam, TextParam } from './ClassifierParam';

export interface Classifier {
  id: string;
  name: string;
  params: Record<string, (SelectParam | TextParam | NumberParam | BooleanParam | RangeParam)>
}
