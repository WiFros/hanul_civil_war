'use client';

import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { Card, CardBody, Button } from "@nextui-org/react";
import { userRoleState } from '@state/atoms';
import ParticipantList from '@components/GameInfo/ParticipantList';
import JoinCode from '@components/GameInfo/JoinCode';
import ChatWindow from '@components/GameInfo/ChatWindow';

interface Participant {
    id: string;
    name: string;
}

interface Message {
    id: string;
    sender: string;
    content: string;
}

interface GameData {
    code: string;
    participants: Participant[];
    // 추가 게임 관련 데이터
}
interface GameInfoPageProps {
    code: string;
    initialGameData: any; // 타입을 더 구체적으로 정의하세요
}

const GameInfoPage: React.FC<GameInfoPageProps> = ({ code, initialGameData }) => {
    const [gameData, setGameData] = useState(initialGameData);
    const userRole = useRecoilValue(userRoleState);
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch(`/api/game/${code}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch game data');
                }
                const data = await response.json();
                setGameData(data.game);
            } catch (error) {
                console.error('Error fetching game data:', error);
                // 에러 처리 (예: 에러 메시지 표시, 홈페이지로 리다이렉트)
            }
        };

        fetchGameData();
    }, [code]);

    const updateParticipants = useCallback((updatedParticipants: Participant[]) => {
        setGameData((prevData: any) => ({
            ...prevData!,
            participants: updatedParticipants
        }));
    }, []);

    const addMessage = useCallback((message: Message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    }, []);

    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000');
        setSocket(newSocket);

        newSocket.emit('joinGame', code);

        newSocket.on('updateParticipants', updateParticipants);
        newSocket.on('newMessage', addMessage);

        return () => {
            newSocket.off('updateParticipants', updateParticipants);
            newSocket.off('newMessage', addMessage);
            newSocket.disconnect();
        };
    }, [code, updateParticipants, addMessage]);

    const handleStartGame = () => {
        // 내전 프로세스 페이지로 이동하는 로직
        console.log('Game started');
    };

    if (!gameData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8">
            <Card className="max-w-4xl mx-auto">
                <CardBody>
                    <h1 className="text-3xl font-bold mb-6 text-center">내전 정보</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <ParticipantList
                                participants={gameData.participants}
                                isCreator={userRole === 'creator'}
                            />
                            <JoinCode code={gameData.code} />
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