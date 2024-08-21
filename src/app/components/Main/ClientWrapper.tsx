'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import GameCreationToggle from '@components/Main/GameCreationToggle';
import GameJoinForm from '@components/Main/GameJoinForm';
import GameCreateButton from '@components/Main/GameCreateButton';
import { useGameState } from '@hooks/useGameState';

const ClientWrapper = () => {
    const router = useRouter();
    const { setGameCode, setUserRole } = useGameState();
    const [joinCode, setJoinCode] = useState('');
    const [isCreating, setIsCreatingLocal] = useState(false);

    const handleCreateGame = async () => {
        try {
            const response = await fetch('/api/create-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create game');
            }

            const data = await response.json();
            setGameCode(data.gameCode);
            setUserRole('creator');
            router.push(`/game/${data.gameCode}`);
        } catch (error) {
            console.error('Failed to create game:', error);
            toast.error('게임 생성에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    const handleJoinGame = async () => {
        try {
            const response = await fetch(`/api/join-game/${joinCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to join game');
            }

            const data = await response.json();
            if (data.success) {
                setGameCode(joinCode);
                setUserRole('participant');
                router.push(`/game/${joinCode}`);
            } else {
                toast.error(data.message || '올바르지 않은 게임 코드입니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Failed to join game:', error);
            toast.error('게임 참가에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <>
            <GameCreationToggle isCreating={isCreating} setIsCreating={setIsCreatingLocal} />
            {isCreating ? (
                <GameCreateButton onClick={handleCreateGame} />
            ) : (
                <GameJoinForm
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    onSubmit={handleJoinGame}
                />
            )}
        </>
    );
};

export default ClientWrapper;