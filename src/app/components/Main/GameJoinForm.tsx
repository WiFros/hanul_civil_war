import React from 'react';
import { Input, Button } from "@nextui-org/react";

interface GameJoinFormProps {
    joinCode: string;
    setJoinCode: (code: string) => void;
    onSubmit: () => void;
}

const GameJoinForm: React.FC<GameJoinFormProps> = ({ joinCode, setJoinCode, onSubmit }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <h3 className="text-xl font-bold mb-4 text-center">내전 참가</h3>
            <Input
                type="text"
                label="참가 코드"
                placeholder="참가 코드를 입력하세요"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="mb-4"
            />
            <Button color="secondary" size="lg" className="w-full" type="submit">
                참가하기
            </Button>
        </form>
    );
};

export default GameJoinForm;