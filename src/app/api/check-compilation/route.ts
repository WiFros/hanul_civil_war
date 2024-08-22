import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // 프로덕션 환경에서는 항상 컴파일된 것으로 간주
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({ isCompiled: true });
        }

        // 개발 환경에서는 실제로 파일 존재 여부를 확인
        const gamePath = path.join(process.cwd(), '.next/server/app/game/[code]/page.js');

        if (fs.existsSync(gamePath)) {
            return NextResponse.json({ isCompiled: true });
        } else {
            return NextResponse.json({ isCompiled: false });
        }
    } catch (error) {
        console.error('Error checking compilation status:', error);
        return NextResponse.json({ error: 'Failed to check compilation status' }, { status: 500 });
    }
}