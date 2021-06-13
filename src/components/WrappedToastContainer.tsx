import React from 'react'
import { ToastContainer, ToastContainerProps } from 'react-toastify'
import './WrappedToastContainer.css'

const WrappedToastContainer: React.VFC<
    ToastContainerProps & { className?: string }
> = ({ className, ...rest }) => (
    <div className={className}>
        <ToastContainer {...rest} />
    </div>
)

export default WrappedToastContainer
