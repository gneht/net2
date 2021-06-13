import { useState } from 'react'
import { toast } from 'react-toastify'

const toastGenerateLink = (link: string): void => {
    const ToastBody = (props: { link: string }) => {
        const [copyMsg, setCopyMsg] = useState(false)
        return (
            <div className="p-4 inline-flex space-x-3">
                <button
                    type="button"
                    className={`rounded-md hover:"text-green-900" focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                    onClick={() => {
                        navigator.clipboard.writeText(link)
                        setCopyMsg(true)
                    }}
                >
                    <div className="h-6 w-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                </button>
                {copyMsg ? (
                    <p>Link Copied!</p>
                ) : (
                    <a
                        className="inline-flex space-x-1 items-baseline underline hover:text-green-900"
                        target="_blank"
                        rel="noreferrer"
                        href={props.link}
                    >
                        <p>Share link</p>
                        <div className="h-4 w-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </div>
                    </a>
                )}
            </div>
        )
    }
    toast.success(<ToastBody link={link} />, {
        autoClose: false,
    })
}

export default toastGenerateLink
