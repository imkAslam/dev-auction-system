export interface InputFieldProps {
  id: string;
  labelFor: string;
  labelText: string;
  name: string;
  value?: string;
  inputType: string;
  customClass?: string;
  placeholder: string;
  isRequired: boolean;
  reff?: any;
  onChange?: (value: unknown) => void;
}
