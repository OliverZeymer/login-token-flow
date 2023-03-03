import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomNotification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      toastStyle={{
        fontFamily: "Poppins, sans-serif",
        fontSize: "1rem",
        fontWeight: "500",
        paddingInline: "1rem",
      }}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="dark"
      draggable
      pauseOnHover
    />
  );
}
