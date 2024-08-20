import { atom } from 'recoil';

export const isCreatingState = atom({
    key: 'isCreatingState',
    default: false,
});

export const joinCodeState = atom({
    key: 'joinCodeState',
    default: '',
});

export const gameNameState = atom({
    key: 'gameNameState',
    default: '',
});

export const gamePasswordState = atom({
    key: 'gamePasswordState',
    default: '',
});

export const errorMessageState = atom({
    key: 'errorMessageState',
    default: '',
});

export const isLoadingState = atom({
    key: 'isLoadingState',
    default: false,
});

export const userRoleState = atom({
    key: 'userRoleState',
    default: 'participant', // 또는 'creator'
});


export const gameCodeState = atom({
    key: 'gameCodeState',
    default: '',
});