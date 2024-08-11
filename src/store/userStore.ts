import { create } from 'zustand';
import { userInfoProps } from '../types/userTypes';

type UserStore = {
    user: userInfoProps | null;
    setUser: (userInfo: userInfoProps) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null, // default
    setUser: (userInfo) => set({ user: userInfo }), 
    clearUser: () => set({ user: null }), 
}));