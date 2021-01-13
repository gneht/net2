import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "./WrappedToastContainer.css";

const WrappedToastContainer = ({
  className,
  ...rest
}: ToastContainerProps & { className?: string }) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
);

export default WrappedToastContainer;
