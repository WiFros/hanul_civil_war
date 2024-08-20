import React from 'react';
import { Button } from "@nextui-org/react";

interface Participant {
    id: string;
    name: string;
}

interface ParticipantListProps {
    participants: Participant[];
    isCreator: boolean;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants, isCreator }) => {
    const handleKick = (id: string) => {
        // 참가자 강퇴 로직
        console.log(`Kicked participant with id: ${id}`);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">참가자 목록</h2>
            <ul className="space-y-2">
                {participants.map((participant) => (
                    <li key={participant.id} className="flex justify-between items-center">
                        <span>{participant.name}</span>
                        {isCreator && (
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleKick(participant.id)}
                            >
                                강퇴
                            </Button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantList;