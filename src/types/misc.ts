export type ListItem = {
  id: string | number;
  name: string;
  form: any;
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
  fields: {
    [key: string]: FormField;
  };
};
