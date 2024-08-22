'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import GameCreationToggle from '@components/Main/GameCreationToggle';
import GameJoinForm from '@components/Main/GameJoinForm';
import GameCreateButton from '@components/Main/GameCreateButton';
import { useGameState } from '@hooks/useGameState';
import { Spinner } from "@nextui-org/react";

const ClientWrapper = () => {
    const router = useRouter();
    const { setGameCode, setUserRole } = useGameState();
    const [joinCode, setJoinCode] = useState('');
    const [nickname, setNickname] = useState('');
    const [isCreating, setIsCreatingLocal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGame = async () => {
        setIsLoading(true);
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

            // Wait for a fixed amount of time (e.g., 2 seconds) before navigating
            setTimeout(() => {
                router.push(`/game/${data.gameCode}`);
            }, 2000);
        } catch (error) {
            console.error('Failed to create game:', error);
            toast.error('게임 생성에 실패했습니다. 다시 시도해 주세요.');
            setIsLoading(false);
        }
    };

    const handleJoinGame = async () => {
        if (!nickname.trim()) {
            toast.error('닉네임을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/join-game/${joinCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname }),
            });

            if (!response.ok) {
                throw new Error('Failed to join game');
            }

            const data = await response.json();
            if (data.success) {
                setGameCode(joinCode);
                setUserRole('participant');

                // Wait for a fixed amount of time before navigating
                setTimeout(() => {
                    router.push(`/game/${joinCode}`);
                }, 2000);
            } else {
                throw new Error(data.message || '올바르지 않은 게임 코드입니다.');
            }
        } catch (error) {
            console.error('Failed to join game:', error);
            toast.error(error instanceof Error ? error.message : '게임 참가에 실패했습니다. 다시 시도해 주세요.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <GameCreationToggle isCreating={isCreating} setIsCreating={setIsCreatingLocal} />
            {isCreating ? (
                <GameCreateButton onClick={handleCreateGame} isLoading={isLoading} />
            ) : (
                <GameJoinForm
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    nickname={nickname}
                    setNickname={setNickname}
                    onSubmit={handleJoinGame}
                    isLoading={isLoading}
                />
            )}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <Spinner size="lg" />
                    <p className="ml-2 text-white">게임을 생성하는 중...</p>
                </div>
            )}
        </>
    );
};

export default ClientWrapper;