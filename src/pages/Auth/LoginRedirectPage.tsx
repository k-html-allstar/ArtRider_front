import { useEffect } from 'react';
import { useLogin } from '../../hooks/queries/userQueries';

const LoginRedirectPage = () => {
  const { mutate: login } = useLogin();

  useEffect(()=>{
    login();
  }, [login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="text-center">
        <p className = "font-Pretendard font-normal text-center text-[18px] text-bg-mainWhite">로그인 처리 중입니다...</p>
      </div>
    </div>
  );
};

export default LoginRedirectPage;
