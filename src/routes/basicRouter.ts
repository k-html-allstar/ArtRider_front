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
    path: () => "/calendar", // 경로 수정
    component: CalendarPage, // 적절한 컴포넌트 추가 필요
  },
  bike: {
    name: "바이킹",
    path: () => "/bike",
    component: BikePage, // 적절한 컴포넌트 추가 필요
  },
  flag: {
    name: "목표",
    path: () => "/flag",
    component: FlagPage, // 적절한 컴포넌트 추가 필요
  },
  coupon: {
    name: "쿠폰",
    path: () => "/coupon",
    component: CouponPage, // 적절한 컴포넌트 추가 필요
  },
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);
