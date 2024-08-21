import React from 'react';
import GameInfoPage from '@components/GameInfo/GameInfoPage';
import db from '@lib/db';

export async function generateMetadata({ params }: { params: { code: string } }) {
    const game = await db.getGame(params.code);
    return { title: game ? `Game ${params.code}` : 'Game Not Found' };
}

export default async function Page({ params }: { params: { code: string } }) {
    const game = await db.getGame(params.code);

    if (!game) {
        return <div>Game not found</div>;
    }

    return <GameInfoPage code={params.code} initialGameData={game} />;
}