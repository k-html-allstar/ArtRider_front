import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserToken } from "../../store/userStore";
import sample from "../../assets/icon.svg";

const SplashPage = () => {
  const navigate = useNavigate();
  const token = useUserToken((state) => state.accessToken);

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate("/main");
      } else {
        navigate("/home");
      }
    }, 3000);
  }, [navigate, token]);

  return (
    <div className="h-screen w-full bg-bg-primary">
      <div className="flex flex-col justify-center items-center space-y-2 h-full">
        <div>
          <img src={sample} width={74} height={74} alt="logo" />
        </div>
        <div className="font-Pretendard font-bold mt-[6px] text-[26px] text-mainWhite">
          ArtRider
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
