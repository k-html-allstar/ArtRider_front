const REST_API_KEY = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY;
const REDIRECT_URI = `${window.location.origin}/oauth/kakao/callback`;
const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const handleLogin = () => {
    window.location.href = KAKAO_URL;
};