// lib/db.ts

interface Game {
    code: string;
    creatorId: string;
    participants: string[];
    // 추가적인 게임 관련 정보를 여기에 넣을 수 있습니다.
}

class InMemoryDB {
    private games: Map<string, Game>;

    constructor() {
        this.games = new Map();
    }

    createGame(creatorId: string): string {
        const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.games.set(gameCode, {
            code: gameCode,
            creatorId,
            participants: [creatorId],
        });
        return gameCode;
    }

    getGame(gameCode: string): Game | undefined {
        return this.games.get(gameCode);
    }

    joinGame(gameCode: string, participantId: string): boolean {
        const game = this.games.get(gameCode);
        if (game) {
            game.participants.push(participantId);
            return true;
        }
        return false;
    }

    // 추가적인 메서드들을 여기에 구현할 수 있습니다.
}

// 싱글톤 인스턴스 생성
const db = new InMemoryDB();

export default db;