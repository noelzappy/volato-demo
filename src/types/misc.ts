export type ListItem = {
  id: string | number;
  name: string;
  form: FormFields;
};

type FormField = {
  label: string;
  type: string;
  readOnly: boolean;
  calculate: Function | null;
  value?: string;
};

export type FormModel = {
  name: string;
  fields: FormFields;
};

export type FormFields = {
  [key: string]: FormField;
};
