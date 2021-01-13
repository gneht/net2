import { toast } from "react-toastify";

const toastClipboard = () => {
  const ToastBody = () => {
    return (
      <div className="p-4 inline-flex space-x-3">
        <p className="font-semibold text-gray-500">Copied to clipboard!</p>
      </div>
    );
  };
  toast(<ToastBody />, {
    autoClose: 2000,
  });
};

export default toastClipboard;
