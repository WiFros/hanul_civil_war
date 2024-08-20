import React from 'react';
import { Button } from "@nextui-org/react";
import { ClipboardIcon } from '@heroicons/react/24/outline';

interface JoinCodeProps {
    code: string;
}

const JoinCode: React.FC<JoinCodeProps> = ({ code }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        // 여기에 복사 성공 메시지를 표시하는 로직을 추가할 수 있습니다.
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">참가 코드</h2>
            <div className="flex items-center space-x-2">
                <span className="text-xl font-mono bg-gray-100 p-2 rounded">{code}</span>
                <Button
                    color="primary"
                    size="sm"
                    onClick={handleCopy}
                    startContent={<ClipboardIcon className="h-5 w-5" />}
                >
                    복사
                </Button>
            </div>
        </div>
    );
};

export default JoinCode;