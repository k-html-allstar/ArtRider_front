import HomePage from "../pages/Home/HomePage";
// import LoginPage from "../pages/Auth/LoginPage";
import LoginRedirectPage from "../pages/Auth/LoginRedirectPage";
import SplashPage from "../pages/Splash/SplashPage";
import { TRoute } from "../types/commonTypes";
import MainPage from "../pages/Main/MainPage";
import CalendarPage from "../pages/Calendar/CalendarPage";
import BikePage from "../pages/Bike/BikePage";
import FlagPage from "../pages/Flag/FlagPage";
import CouponPage from "../pages/Coupon/CouponPage";

export const BASIC_ROUTES_URL = {
  root: {
    name: "홈페이지",
    path: () => "/",
    component: SplashPage,
  },
  home: {
    name: "홈페이지",
    path: () => "/home",
    component: HomePage,
  },
  auth: {
    name: "로그인 리다이렉트",
    path: () => "/oauth/kakao/callback",
    component: LoginRedirectPage,
  },
  main: {
    name: "메인",
    path: () => "/main",
    component: MainPage,
  },
  calendar: {
    // 오타 수정: 'calender' -> 'calendar'
    name: "캘린더",
    path: () => "/calendar",
    component: CalendarPage,
  },
  bike: {
    name: "바이킹",
    path: () => "/bike",
    component: BikePage,
  },
  flag: {
    name: "목표",
    path: () => "/flag",
    component: FlagPage,
  },
  coupon: {
    name: "쿠폰",
    path: () => "/coupon",
    component: CouponPage,
  },
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);
