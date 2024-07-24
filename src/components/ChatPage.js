import React, { useState, useEffect } from 'react';
import 'flowbite';
import 'tailwindcss/tailwind.css';
import { firestore } from './context/firebase';
import { collection, doc, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from './context/authContext/index.js'; // Adjust the import path as necessary
import { HiOutlinePaperAirplane, HiOutlineUserCircle } from 'react-icons/hi'; // For user icons

const ChatPage = ({ farmersInfo }) => {
    // State to hold multiple conversations
    const [conversations, setConversations] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [activeConversationIndex, setActiveConversationIndex] = useState(0);
    const avatarImage = process.env.PUBLIC_URL + '/images/profile.webp';

    const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
    const yourUserName = storedDBData?.user_name;
    let isLandowner = storedDBData.designation == "L" ? true : false;

    useEffect(() => {
        farmersInfo.map((user, index) => {
            if (user.username !== yourUserName) {
                const conversationId = [`${yourUserName}`, `${user.username}`].sort().join("");
                let messagesRef;
                if (!isLandowner) {
                    messagesRef = collection(firestore, "users", user.username, "conversations", conversationId, "messages");
                } else {
                    messagesRef = collection(firestore, "users", yourUserName, "conversations", conversationId, "messages");
                }
                const q = query(messagesRef, orderBy("timestamp"));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const messages = [];
                    querySnapshot.forEach((doc) => {
                        messages.push({ id: doc.id, ...doc.data() });
                    });

                    setConversations(prevConversations => {
                        const newConversations = [...prevConversations];
                        newConversations[index] = { name: `${user.username}`, messages };
                        return newConversations;
                    });
                });

                return () => unsubscribe();
            }
        })
    }, [firestore]); // Added dependencies

    const handleSendMessage = async () => {
        if (currentMessage.trim() !== '') {
            const activeUserId = farmersInfo[activeConversationIndex];
            const conversationId = [yourUserName, activeUserId.username].sort().join("");

            let messagesRef;
            if (!isLandowner) {
                messagesRef = collection(firestore, "users", activeUserId.username, "conversations", conversationId, "messages");
            } else {
                messagesRef = collection(firestore, "users", yourUserName, "conversations", conversationId, "messages");
            }

            try {
                await addDoc(messagesRef, {
                    text: currentMessage,
                    senderID: yourUserName,
                    timestamp: new Date(), // Firestore uses server timestamps, which is recommended
                });
                setCurrentMessage('');
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    const handleMessageChange = (event) => {
        setCurrentMessage(event.target.value);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-5 border-r border-gray-300 shadow-lg">
                {/* List of chat contacts */}
                <ul className="divide-y divide-gray-200">
                    {conversations.map((conversation, index) => (
                        <li
                            key={index}
                            className={`flex items-center space-x-3 p-3 ${index === activeConversationIndex ? 'bg-green-200' : 'hover:bg-green-100'
                                } cursor-pointer transition-all duration-200 ease-in-out transform ${index === activeConversationIndex && 'scale-105'
                                } border border-gray-300 rounded-lg mt-2`}
                            onClick={() => setActiveConversationIndex(index)}
                        >
                            <img className="w-10 h-10 rounded-full border-2 border-green-700 shadow" src={avatarImage} alt="avatar" />
                            <div className="flex-1">
                                <div className="font-semibold text-gray-800">{conversation.name}</div>
                                <div className="text-sm text-gray-600 w-32 truncate">
                                    {conversation.messages[conversation.messages.length - 1]?.text || 'No messages'}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat container */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="bg-gradient-to-r from-green-300 to-green-500 p-6 shadow-md rounded-lg border-b border-gray-300">
                    <div className="flex items-center space-x-3">
                        <h1 className="font-semibold text-xl text-white">
                            {conversations.length > 0 ? conversations[activeConversationIndex].name : 'Select a conversation'}
                        </h1>
                    </div>
                </div>
                {/* Chat messages */}
                <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
                    {conversations[activeConversationIndex]?.messages.map((message, index) => (
                        <div key={index} className={`flex items-end ${message.senderID === yourUserName ? 'justify-end' : ''} mb-4`}>
                            {message.senderID !== yourUserName && (
                                <img className="w-8 h-8 rounded-full mr-2" src={avatarImage} alt="avatar" />
                            )}
                            <div className={`rounded-lg px-4 py-2 text-sm ${message.senderID === yourUserName ? 'bg-green-500 text-white' : 'bg-white'
                                }`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Chat input */}
                <div className="sticky bottom-0 bg-white p-4 flex items-center border-t border-gray-300">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={handleMessageChange}
                        className="flex-1 bg-gray-100 rounded-full pl-4 pr-10 border border-gray-300 focus:ring focus:ring-green-200 transition duration-150"
                        placeholder="Type a message..."
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 rounded-full p-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                    >
                        <HiOutlinePaperAirplane className="text-xl transform rotate-90" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
