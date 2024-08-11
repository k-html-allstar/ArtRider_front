import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userInfoProps } from '../types/userTypes';

type UserStore = {
    user: userInfoProps | null;
    setUser: (userInfo: userInfoProps) => void;
    clearUser: () => void;
}

type TokenStore = {
    accessToken: string;
    refreshToken: string;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    clearTokens: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (userInfo) => set({ user: userInfo }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user', 
            getStorage: () => localStorage, 
        }
    )
);

export const useUserToken = create<TokenStore>()(
    persist(
        (set) => ({
            accessToken: '',
            refreshToken: '',
            setAccessToken: (token) => set({ accessToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            clearTokens: () => set({ accessToken: '', refreshToken: '' }),
        }),
        {
            name: 'token', 
            getStorage: () => localStorage,
        }
    )
);