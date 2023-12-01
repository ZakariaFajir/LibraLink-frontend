import { toast } from "react-toastify";

export const getError = (error) => {
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const showErrorToast = (message) => {
  if (!toast.isActive(message)) {
    toast.error(message, {
      toastId: message,
    });
  }
};
export const showSuccessToast = (message) => {
  if (!toast.isActive(message)) {
    toast.success(message, {
      toastId: message,
    });
  }
};
export const showInfoToast = (message) => {
  if (!toast.isActive(message)) {
    toast.info(message, {
      toastId: message,
    });
  }
};
