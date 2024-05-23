import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const App = () => {
    const [username, setUsername] = useState('');
    const [ws, setWs] = useState(null);
    const [subscribed, setSubscribed] = useState(false);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const handleConnect = () => {
        if (username) {
            const websocket = new WebSocket('wss://srmj9tj6rb.execute-api.ap-south-1.amazonaws.com/dev/');

            websocket.onopen = () => {
                console.log('WebSocket connection established');
                setWs(websocket);

                websocket.send(JSON.stringify({
                    action : 'connect',
                    event: 'chat_room',
                    username: username,
                }));
            };

            websocket.onmessage = (message) => {
                const data = JSON.parse(message.data);
                console.log('Message from server:', data);
                setMessages((prevMessages) => [...prevMessages, data]);

                console.log(data.event)
                if (data.event === 'subscribed') {
                    setSubscribed(true);
                    navigate('/user-data');
                }

                if (data.event === 'user_added') {
                    Cookies.set('connection_id', data.connection_id);
                    console.log(data.connection_id)
                }

                if(data.event === 'user_removed') {
                    console.log(data)
                }
            };

            websocket.onclose = () => {
                console.log('WebSocket connection closed');
                setSubscribed(false);
            };

            websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                setSubscribed(false);
            };
        }
    };

    const handleDisconnect = () => {
        if (ws) {
            console.log('Disconnecting WebSocket connection');
            ws.close();
            setWs(null);
            setSubscribed(false);
        }
    };

    return (
        <div className='w-full h-screen bg-cyan-200 flex items-center justify-center flex-col '>
            <h1 className='text-xl mb-2'>WebSocket Connection</h1>

            <form className='bg-cyan-100 w-[400px] h-[200px] flex flex-col items-center gap-4 p-4 rounded-lg' onSubmit={(e) => e.preventDefault()}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <button className='flex justify-center items-center px-3 py-2 bg-cyan-300 rounded-full' type="button" onClick={handleConnect}>Connect</button>
                <button className='flex justify-center items-center px-3 py-2 bg-cyan-300 rounded-full' type="button" onClick={handleDisconnect}>Disconnect</button>

            </form>

            {ws && <p>WebSocket connection is active</p>}
            {subscribed && <p>Subscribed to chat_room</p>}
        </div>
    );
};

export default App;
