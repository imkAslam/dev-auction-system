export interface ButtonProps {
  children: string | JSX.Element | JSX.Element[];
  btnType: "button" | "submit" | "reset";
  customClass?: string;
  isDisabled?: boolean;
  handleClick?: (value: unknown) => void;
}
