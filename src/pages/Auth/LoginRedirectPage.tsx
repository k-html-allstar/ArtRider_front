import { useEffect } from 'react';
import { useLogin } from '../../hooks/queries/userQueries';

const LoginRedirectPage = () => {
  const { mutate: login } = useLogin();

  useEffect(()=>{
    login();
  }, [login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p>로그인 처리 중입니다...</p>
      </div>
    </div>
  );
};

export default LoginRedirectPage;
