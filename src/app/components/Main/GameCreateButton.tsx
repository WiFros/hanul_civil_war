import React from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const GameCreateButton: React.FC = () => {
    const router = useRouter();

    const handleCreateGame = async () => {
        try {
            const response = await fetch('/api/create-game', { method: 'POST' });
            const data = await response.json();
            if (data.gameCode) {
                router.push(`/game/${data.gameCode}`);
            }
        } catch (error) {
            console.error('게임 생성 중 오류 발생:', error);
        }
    };

    return (
        <>
            <h3 className="text-xl font-bold mb-4 text-center">내전 생성</h3>
            <Button
                color="primary"
                size="lg"
                className="w-full"
                onClick={handleCreateGame}
            >
                새 내전 생성하기
            </Button>
        </>
    );
};

export default GameCreateButton;