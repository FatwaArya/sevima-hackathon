'use client'

import { useChat } from 'ai/react'

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat()

    return (
        <div>
            {messages.map(m => (
                <div key={m.id}>
                    {
                        //only show user and assistant messages
                        m.role === 'user' || m.role === 'assistant' ?
                            <div>
                                <div>{m.content}</div>
                            </div>
                            : null

                    }
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <label>
                    Say something...
                    <input
                        value={input}
                        onChange={handleInputChange}
                    />
                </label>
            </form>
        </div>
    )
}