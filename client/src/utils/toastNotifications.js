import { toast } from "react-toastify";

export const successMessage = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: undefined,
    theme: "light",
  });
};

export const errorMessage = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: undefined,
    theme: "light",
  });
};
