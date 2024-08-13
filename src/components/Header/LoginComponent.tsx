import { useUserStore, useUserToken } from '../../store/userStore';
import kakao from '../../assets/kakao.svg';

const LoginComponent = () => {
    const user = useUserStore((state) => state.user);
    const token = useUserToken((state) => state.accessToken);
    // const navigate = useNavigate()

    const REST_API_KEY = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY;
    const REDIRECT_URI = `${window.location.origin}/oauth/kakao/callback`;
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        window.location.href = KAKAO_URL;
    };

    return (
        <div className='flex justify-between'>
            {token && user ? (
                <div>{user.name}님</div>
            ) : (
                <div onClick={handleLogin} className='flex flex-row space-x-2 rounded-md bg-kakao-yellow py-[11px] cursor-pointer px-[14px]'>
                    <img src={kakao} width={18} height={16.5} alt="logo" />
                    <div className="px-12">카카오톡으로 3초만에 시작하기</div>
                </div>
            )}
        </div>
    );
};

export default LoginComponent;