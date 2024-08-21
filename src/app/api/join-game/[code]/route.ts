// src/app/api/join-game/[code]/route.ts
import { NextResponse } from 'next/server'
import db from '@lib/db'

export async function POST(
    request: Request,
    { params }: { params: { code: string } }
) {
    const { code } = params
    const participantId = 'user-' + Math.random().toString(36).substring(2, 8);

    if (db.joinGame(code, participantId)) {
        return NextResponse.json({ success: true })
    } else {
        return NextResponse.json(
            { success: false, message: 'Invalid game code or game is full' },
            { status: 400 }
        )
    }
}