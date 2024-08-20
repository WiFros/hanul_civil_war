import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";

interface Message {
    id: string;
    sender: string;
    content: string;
}

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            // 여기에 메시지 전송 로직을 추가해야 합니다.
            console.log('Sending message:', newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="h-96 flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">채팅</h2>
            <div className="flex-grow overflow-y-auto mb-4 bg-gray-100 p-4 rounded">
                {messages.map((message) => (
                    <div key={message.id} className="mb-2">
                        <span className="font-semibold">{message.sender}: </span>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button color="primary" onClick={handleSend}>
                    전송
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;