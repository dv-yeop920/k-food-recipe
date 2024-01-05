import { toast } from "react-toastify";

const toastMessage = msg => {
  toast(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 1300,
  });
};

export default toastMessage;
