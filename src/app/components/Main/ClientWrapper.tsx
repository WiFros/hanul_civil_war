'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import GameCreationToggle from './GameCreationToggle';
import GameJoinForm from './GameJoinForm';
import GameCreateButton from './GameCreateButton';
import { isCreatingState, gameCodeState, userRoleState } from '../../state/atoms';

const ClientWrapper = () => {
    const router = useRouter();
    const setIsCreating = useSetRecoilState(isCreatingState);
    const setGameCode = useSetRecoilState(gameCodeState);
    const setUserRole = useSetRecoilState(userRoleState);
    const [joinCode, setJoinCode] = useState('');
    const [isCreating, setIsCreatingLocal] = useState(false);

    const handleCreateGame = async () => {
        try {
            // 여기서 실제로 서버에 새 게임 생성 요청을 보내고 응답으로 게임 코드를 받아야 합니다.
            const response = await fetch('/api/create-game', { method: 'POST' });
            const data = await response.json();
            setGameCode(data.gameCode);
            setUserRole('creator');
            router.push(`/game/${data.gameCode}`);
        } catch (error) {
            console.error('Failed to create game:', error);
            // 에러 처리 로직 (예: 사용자에게 에러 메시지 표시)
        }
    };

    const handleJoinGame = async () => {
        try {
            // 여기서 실제로 서버에 게임 참가 요청을 보내고 유효성을 검증해야 합니다.
            const response = await fetch(`/api/join-game/${joinCode}`, { method: 'POST' });
            if (response.ok) {
                setGameCode(joinCode);
                setUserRole('participant');
                router.push(`/game/${joinCode}`);
            } else {
                // 잘못된 게임 코드 처리
                alert('Invalid game code. Please try again.');
            }
        } catch (error) {
            console.error('Failed to join game:', error);
            // 에러 처리 로직
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