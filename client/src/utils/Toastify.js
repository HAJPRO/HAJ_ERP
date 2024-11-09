import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const ToastifyService = {
  ToastInfo(item) {
    return toast.info("Toast Info !", { autoClose: 1000 });
  },
  ToastSuccess(data) {
    console.log(data.msg);
    return toast.success(data.msg, { autoClose: 1000 });
  },
  ToastWarning(item) {
    return toast.warning("Toast warning !", { autoClose: 1000 });
  },
  ToastError(error) {
    return toast.error(error.msg, { autoClose: 1000 });
  },
};
