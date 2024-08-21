// src/app/api/create-game/route.ts
import { NextResponse } from 'next/server'
import db from '@lib/db'

export async function POST() {
    const creatorId = 'user-' + Math.random().toString(36).substring(2, 8);
    const gameCode = db.createGame(creatorId);

    return NextResponse.json({ gameCode })
}