import React from "react";
import { InputFieldProps } from "./inputField.interface";

const fixedInputClass = `block w-full px-4  h-12 bg-white border
border-gray-400 rounded-md text-sm shadow-sm placeholder-slate-400
 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400
 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
 invalid:border-pink-500 invalid:text-pink-600
 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer`;

const InputField: React.FC<InputFieldProps> = ({
  id,
  labelText,
  labelFor,
  name,
  value,
  isRequired,
  placeholder,
  reff,
  inputType,
  customClass,
  onChange,
}) => {
  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   onChange(event.target.value);
  // };

  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="text-base font-medium text-gray-600">
        {labelText}
      </label>
      <input
        value={value}
        id={id}
        name={name}
        type={inputType}
        required={isRequired}
        onChange={onChange}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
        {...reff}
      />
    </div>
  );
};
export default InputField;
