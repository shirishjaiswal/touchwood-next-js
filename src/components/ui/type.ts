export interface BaseField {
  id: string;
  name: string;
  'aria-label': string;
  'data-testid': string;
}
export interface BaseFieldProps extends BaseField {
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  mainContainerStyles?: string;
  infoContainerStyles?: string;
  labelStyles?: string;
  descriptionStyles?: string;
  errorStyles?: string;
}

export type EventInterfaceValue =
  | string
  | boolean
  | string[]
  | number
  | object
  | object[];

export interface EventInterface {
  target: {
    value: EventInterfaceValue;
    validationMessage: string | undefined;
  };
}
