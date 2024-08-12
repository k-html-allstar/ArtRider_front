import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sample from '../../assets/icon.svg'

const SplashPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-bg-primary">
        <div className="flex flex-col justify-center items-center space-y-2 h-full">
            <div>
                <img src={sample} width={74} height={74} alt="logo" />
            </div>
            <div className="font-Pretendard font-bold  text-[26px] text-mainWhite">타세용</div>
        </div>
    </div>
  )
}

export default SplashPage;