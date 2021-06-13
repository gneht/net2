import { toast } from 'react-toastify'

const toastRemoveColumn = (): void => {
    const ToastBody = () => {
        return <div className="p-4">Column Removed</div>
    }
    toast.error(<ToastBody />, {
        autoClose: 2000,
    })
}

export default toastRemoveColumn
