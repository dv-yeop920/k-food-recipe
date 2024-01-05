import { toast } from "react-toastify";

const toastMessage = msg => {
  toast(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 1500,
  });
};

export default toastMessage;
