import { useSetRecoilState } from 'recoil';
import { gameCodeState, userRoleState } from '@state/atoms';

export const useGameState = () => {
    const setGameCode = useSetRecoilState(gameCodeState);
    const setUserRole = useSetRecoilState(userRoleState);

    return { setGameCode, setUserRole };
};