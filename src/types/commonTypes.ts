import { AxiosError } from "axios";

export type TRoute = {
    name: string;
    path: (params?: any) => string;
    component: () => JSX.Element;
};
