import { toast } from "react-toastify";

export const getError = (error) => {
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;
};


export const showErrorToast = (message, customPosition) => {
  if (!toast.isActive(message)) {
    toast.error(message, {
      toastId: message,
      position: customPosition || 'top-righ',
    });
  }
};

export const showSuccessToast = (message, customPosition) => {
  if (!toast.isActive(message)) {
    toast.success(message, {
      toastId: message,
      position: customPosition || 'top-right',
    });
  }
};

export const showInfoToast = (message, customPosition) => {
  if (!toast.isActive(message)) {
    toast.info(message, {
      toastId: message,
      position: customPosition || 'top-right',
    });
  }
};


