import React from "react";
import { ButtonProps } from "./button.interface";

const Button: React.FC<ButtonProps> = ({
  children,
  btnType = "button",
  customClass,
  handleClick,
  isDisabled = false,
}) => {
  return (
    <button
      disabled={isDisabled}
      type={btnType}
      onClick={handleClick}
      className={`disabled:opacity-[0.3] disabled:text-[rgba(0, 0, 0, 0.6)] h-12 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded flex justify-center items-center ${customClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
