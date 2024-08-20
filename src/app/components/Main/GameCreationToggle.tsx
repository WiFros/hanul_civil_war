'use client';

import React from 'react';
import { Switch } from "@nextui-org/react";

interface GameCreationToggleProps {
    isCreating: boolean;
    setIsCreating: (value: boolean) => void;
}

const GameCreationToggle: React.FC<GameCreationToggleProps> = ({ isCreating, setIsCreating }) => {
    return (
        <div className="flex justify-center items-center mb-6">
            <span className={`mr-2 transition-colors duration-300 ${isCreating ? 'text-gray-500' : 'text-blue-600'}`}>참가</span>
            <Switch
                checked={isCreating}
                onChange={() => setIsCreating(!isCreating)}
                classNames={{
                    base: "bg-white",
                    wrapper: isCreating ? "bg-blue-200" : "bg-gray-200",
                }}
            />
            <span className={`ml-2 transition-colors duration-300 ${isCreating ? 'text-blue-600' : 'text-gray-500'}`}>생성</span>
        </div>
    );
};

export default GameCreationToggle;