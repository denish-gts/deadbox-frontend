import { toast } from "react-toastify";

const errorCheckAPIResponse = (error) => {
  const errorMsg = error?.response?.data?.error;
  const error_message = error?.response?.data?.message;
  const errorsData = error?.response?.data?.errors;

  if (errorMsg || error_message) {
    toast.error(errorMsg || error_message);
  } else if (errorsData) {
    for (const [key, value] of Object.entries(errorsData)) {
      if (value.length > 0) {
        toast.error(value[0]);
      }
    }
  }
}

export const successAPIResponse = (res) => {
  const successMsg = res?.data?.message
  toast.success(successMsg)
}

export {
  errorCheckAPIResponse
};
