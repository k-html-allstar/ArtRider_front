import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import LoginRedirectPage from "../pages/Login/LoginRedirectPage";
import { TRoute } from "../types/commonTypes";

export const BASIC_ROUTES_URL = {
    home: {
        name: '홈페이지',
        path: () => '/',
        component: HomePage,
    },
    login: {
        name: '로그인',
        path: () => '/login',
        component: LoginPage
    },
    auth: {
        name: '로그인 리다이렉트',
        path: () => '/auth',
        component: LoginRedirectPage
    },
    
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);