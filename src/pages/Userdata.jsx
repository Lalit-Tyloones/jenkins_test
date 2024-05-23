import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import Cookies from 'js-cookie';

function Userdata() {
    const [userConnections, setUserConnections] = useState([]);
    const [currentUserConnectionId, setCurrentUserConnectionId] = useState(Cookies.get('connection_id'));
    const [selectedUserConnection, setSelectedUserConnection] = useState(null);

    const fetchUserConnections = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/user-data/');
            console.log('Response data:', response.data);

            if (response.data && response.data.user_connections) {
                setUserConnections(response.data.user_connections);
            } else {
                console.log('User connections not found in the response data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserConnections();

        const checkConnectionIdCookie = () => {
            const connectionId = Cookies.get('connection_id');
            if (connectionId !== currentUserConnectionId) {
                setCurrentUserConnectionId(connectionId);
                fetchUserConnections();
            }
        };

        const cookieChangeHandler = setInterval(checkConnectionIdCookie, 1000);

        return () => {
            clearInterval(cookieChangeHandler);
            Cookies.remove('connection_id');
        };
    }, [currentUserConnectionId]);

    const handleChatInitiation = (connection) => {
        setSelectedUserConnection(connection);
    };

    

    const handleDisconnect = async (connectionId) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/disconnect/', {connectionId});
            console.log('Disconnect response:', response.data);
            if (response.data.message === 'disconnected to websocket server.') {
                setUserConnections(prevConnections => prevConnections.filter(connection => connection.connection_id !== connectionId));
            }
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 p-4">
                <h1 className="text-2xl font-bold mb-4">User Connections</h1>
                {userConnections.length === 0 ? (
                    <div>No other user connections found.</div>
                ) : (
                    <ul>
                        {userConnections.map((connection, index) => (
                            <li key={index} className="mb-2 flex items-center justify-between">
                                <span
                                    className="cursor-pointer text-blue-500 underline"
                                    onClick={() => handleChatInitiation(connection)}
                                >
                                    {connection.username}
                                </span>
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                                    onClick={() => handleDisconnect(connection.connection_id)}
                                >
                                    Disconnect
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-2/3 border-l border-gray-300">
                {selectedUserConnection ? (
                    <Chat
                        connectionId={selectedUserConnection.connection_id}
                        
                    />
                ) : (
                    <div className="p-4">Select a user to start chatting</div>
                )}
            </div>
        </div>
    );
}

export default Userdata;





