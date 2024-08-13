import HomePage from "../pages/Home/HomePage";
// import LoginPage from "../pages/Auth/LoginPage";
import LoginRedirectPage from "../pages/Auth/LoginRedirectPage";
import SplashPage from "../pages/Splash/SplashPage";
import { TRoute } from "../types/commonTypes";
import MainPage from "../pages/Main/MainPage";

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
    auth: {
        name: '로그인 리다이렉트',
        path: () => '/oauth/kakao/callback',
        component: LoginRedirectPage
    },
    main: {
        name: '메인',
        path: () => '/main',
        component: MainPage,
    }
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);