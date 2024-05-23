import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ connectionId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('wss://srmj9tj6rb.execute-api.ap-south-1.amazonaws.com/dev/');

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectionId]);

    const sendMessage = () => {
        if (input.trim() === '') return;

        const message = {
            action: 'Chat',
            recipient_connection_id: connectionId,
            message: input,
            sender: 'You'
        };

        socketRef.current.send(JSON.stringify(message));
        setMessages((prevMessages) => [...prevMessages, { sender: 'You', message: input }]);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full p-4">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            <div className="flex-1 overflow-y-auto border p-4 mb-4 flex flex-col-reverse">
                {messages.slice().reverse().map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded ${
                            msg.sender === 'You' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start'
                        }`}
                    >
                        <strong>{msg.sender || 'Other'}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded"
                />
                <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
            </div>
        </div>
    );
};

export default Chat;




