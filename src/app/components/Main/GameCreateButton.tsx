import React from 'react';
import { Button } from "@nextui-org/react";

interface GameCreateButtonProps {
    onClick: () => Promise<void>;
    isLoading: boolean;
}

const GameCreateButton: React.FC<GameCreateButtonProps> = ({ onClick, isLoading }) => {
    return (
        <>
            <h3 className="text-xl font-bold mb-4 text-center">내전 생성</h3>
            <Button
                color="primary"
                size="lg"
                className="w-full"
                onClick={onClick}
                disabled={isLoading}
            >
                새 내전 생성하기
            </Button>
        </>
    );
};

export default GameCreateButton;