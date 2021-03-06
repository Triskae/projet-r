export enum ParamType {
  SELECT,
  TEXT,
  NUMBER,
  BOOLEAN,
  RANGE
}

export interface SelectParamOption {
  label: string;
  value: string;
}

export interface ClassifierParam {
  type: ParamType;
  label: string;
  required: boolean;
}

export interface SelectParam extends ClassifierParam {
  type: ParamType.SELECT;
  options: SelectParamOption[]
}

export interface TextParam extends ClassifierParam {
  type: ParamType.TEXT;
  placeholder: string;
}

export interface NumberParam extends ClassifierParam {
  type: ParamType.NUMBER;
  placeholder: string;
}

export interface BooleanParam extends ClassifierParam {
  type: ParamType.BOOLEAN;
}

export interface RangeParam extends ClassifierParam {
  type: ParamType.RANGE;
  min: number;
  max: number;
  step: number;
}
