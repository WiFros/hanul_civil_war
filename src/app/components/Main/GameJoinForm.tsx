import React from 'react';
import { Input, Button } from "@nextui-org/react";

interface GameJoinFormProps {
    joinCode: string;
    setJoinCode: (code: string) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    onSubmit: () => Promise<void>;
    isLoading: boolean;
}

const GameJoinForm: React.FC<GameJoinFormProps> = ({
                                                       joinCode,
                                                       setJoinCode,
                                                       nickname,
                                                       setNickname,
                                                       onSubmit,
                                                       isLoading
                                                   }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4 text-center">내전 참가</h3>
            <Input
                type="text"
                label="참가 코드"
                placeholder="참가 코드를 입력하세요"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="mb-4"
                disabled={isLoading}
            />
            <Input
                type="text"
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mb-4"
                disabled={isLoading}
            />
            <Button
                color="secondary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={isLoading}
            >
                참가하기
            </Button>
        </form>
    );
};

export default GameJoinForm;