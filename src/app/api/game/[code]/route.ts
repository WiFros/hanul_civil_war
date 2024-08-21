import { NextRequest, NextResponse } from 'next/server'
import db from '@lib/db'  // 경로는 프로젝트 구조에 따라 조정될 수 있습니다.

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    const { code } = params
    const game = db.getGame(code)

    if (game) {
        return NextResponse.json({ success: true, game })
    } else {
        return NextResponse.json(
            { success: false, message: 'Game not found' },
            { status: 404 }
        )
    }
}