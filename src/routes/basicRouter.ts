import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import LoginRedirectPage from "../pages/Auth/LoginRedirectPage";
import SplashPage from "../pages/Splash/SplashPage";
import { TRoute } from "../types/commonTypes";

export const BASIC_ROUTES_URL = {
    root: {
        name: '홈페이지',
        path: () => '/',
        component: SplashPage,
    },
    home: {
        name: '홈페이지',
        path: () => '/home',
        component: HomePage,
    },
    login: {
        name: '로그인',
        path: () => '/login',
        component: LoginPage
    },
    auth: {
        name: '로그인 리다이렉트',
        path: () => '/oauth/kakao/callback',
        component: LoginRedirectPage
    },
    // path 추가
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);