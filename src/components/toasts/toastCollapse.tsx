import { toast } from 'react-toastify'

const toastCollapse = (collapsed: boolean) => {
    const ToastBody = (props: { collapsed: boolean }) => {
        return (
            <div className="p-4 inline-flex space-x-3">
                <p className="font-semibold text-gray-500">
                    {props.collapsed ? 'Column expanded!' : 'Column collapsed!'}
                </p>
            </div>
        )
    }
    toast(<ToastBody collapsed={collapsed} />, {
        autoClose: 2000,
    })
}

export default toastCollapse
