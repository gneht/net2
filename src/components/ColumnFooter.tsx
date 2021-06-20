import { useState } from 'react'
import { OPTIONS } from '../types'
import './ColumnFooter.css'

const ColumnFooter: React.VFC<{
    options: OPTIONS
    createCardHandler: (url: string) => Promise<void>
}> = (props) => {
    const { createCardHandler, options } = props

    const [text, setText] = useState('')

    return (
        <div className="add-card">
            <div className="add-card-heading text-sm text-gray-500">
                + Add Card
            </div>
            <div className="add-card-dropdown">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        createCardHandler(text)
                        setText('')
                    }}
                    noValidate
                >
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="p-1 w-full border-b-2 focus:outline-none focus:border-gray-500 bg-transparent"
                        placeholder={
                            options.markdownLinks
                                ? "'[text](url)' or 'url'"
                                : 'url'
                        }
                    />
                </form>
            </div>
        </div>
    )
}

export default ColumnFooter
