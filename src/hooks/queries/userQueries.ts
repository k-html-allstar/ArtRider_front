import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { $axios } from "../../lib/axios";
import { useUserStore, useUserToken } from "../../store/userStore";
import { userInfoProps } from "../../types/userTypes";
import toast from "react-hot-toast";

export const useLogin = (): UseMutationResult<userInfoProps, unknown, void, unknown> => {
    const authorizationCode = new URL(window.location.href).searchParams.get('code');
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const setAccessToken = useUserToken((state) => state.setAccessToken);
    const setRefreshToken = useUserToken((state) => state.setRefreshToken);
    const clearTokens = useUserToken((state) => state.clearTokens);
    const clearUser = useUserStore((state) => state.clearUser)

    return useMutation({
        mutationFn: async (): Promise<userInfoProps> => {
            const response = await $axios.post('/api/auth/kakao', { authorizationCode }); 

            // accessToken, refreshToken zustand로 저장
            const { accessToken, refreshToken, expiresIn } = response.data;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);

            // accessToken의 만료 시간 후 초기화
            setTimeout(() => {
                clearTokens();
                clearUser();
                toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
                navigate('/login');
            }, expiresIn * 1000); // 만료 시간 (초 단위)를 밀리초로 변환

            return response.data;
        },
        onSuccess: async (userInfo: userInfoProps) => {
            try {
                // TODO 유저정보 받아오는 API 통신 response: userInfo

                setUser(userInfo);
                toast.success(`${userInfo.name}님 환영합니다!`);
                navigate('/home');
            } catch (error) {
                toast.error('유저 정보를 불러오는데 실패했습니다.');
                navigate('/login')
            }
        },
        onError: () => {
            toast.error('카카오 계정을 확인해주세요.');
            navigate('/login');
        }
    })
}