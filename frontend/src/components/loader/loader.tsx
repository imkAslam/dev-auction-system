import { Oval } from "react-loader-spinner";
import { LoaderProps } from "./loader.interface";

function Loader({ color, bgColor, width, height }: LoaderProps) {
  return (
    <Oval
      height={height || "26"}
      width={width || "26"}
      color={color || "#000"}
      secondaryColor={bgColor || "white"}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
}

export default Loader;
