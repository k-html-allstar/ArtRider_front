import { create } from 'zustand';

type MapStore = {
    drawInfoArr: Tmapv2.LatLng[];
    setDrawInfoArr: (newArr: Tmapv2.LatLng[]) => void;
};

export const useMapStore = create<MapStore>((set) => ({
    drawInfoArr: [],
    setDrawInfoArr: (newArr: Tmapv2.LatLng[]) => set({ drawInfoArr: newArr }),
}));