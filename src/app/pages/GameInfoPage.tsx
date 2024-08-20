'use client';

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardBody, Button } from "@nextui-org/react";
import { userRoleState } from '../state/atoms';
import ParticipantList from '../components/GameInfo/ParticipantList';
import JoinCode from '../components/GameInfo/JoinCode';
import ChatWindow from '../components/GameInfo/ChatWindow';
import io from 'socket.io-client';

interface Participant {
    id: string;
    name: string;
}

interface Message {
    id: string;
    sender: string;
    content: string;
}

const GameInfoPage = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const userRole = useRecoilValue(userRoleState);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000'); // 서버 URL을 적절히 변경해주세요
        setSocket(newSocket);

        newSocket.on('updateParticipants', (updatedParticipants: Participant[]) => {
            setParticipants(updatedParticipants);
        });

        newSocket.on('newMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleStartGame = () => {
        // 내전 프로세스 페이지로 이동하는 로직
        console.log('Game started');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8">
            <Card className="max-w-4xl mx-auto">
                <CardBody>
                    <h1 className="text-3xl font-bold mb-6 text-center">내전 정보</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <ParticipantList participants={participants} isCreator={userRole === 'creator'} />
                            <JoinCode code="ABCD1234" /> {/* 실제 코드로 대체해야 합니다 */}
                        </div>
                        <div>
                            <ChatWindow messages={messages} />
                        </div>
                    </div>
                    {userRole === 'creator' && (
                        <Button
                            color="primary"
                            size="lg"
                            className="mt-6 w-full"
                            onClick={handleStartGame}
                        >
                            내전 시작
                        </Button>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default GameInfoPage;