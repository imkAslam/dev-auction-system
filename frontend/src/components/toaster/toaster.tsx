import { toast } from "react-toastify";

interface ToasterProps {
  type: string;
  message: string;
}

function Toaster({ type, message }: ToasterProps) {
  toast(message || "hi im toast", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: type === "success" ? "success" : type === "error" ? "error" : "info",
  });
}

export default Toaster;
