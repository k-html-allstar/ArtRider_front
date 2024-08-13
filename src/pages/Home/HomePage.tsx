import sample from "../../assets/icon.svg";
import LoginComponent from "../../components/Login/LoginComponent";
import { useUserStore, useUserToken } from "../../store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  const token = useUserToken((state) => state.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate("/main");
    }
  }, [token, user, navigate]);

  return (
    <div className="h-screen w-full bg-bg-primary">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="my-[193px]">
          <img src={sample} width={74} height={74} alt="logo" />
          <div className="font-Pretendard text-center font-bold mt-[6px] text-[26px] text-mainWhite">
            ArtRider
          </div>
        </div>
        <LoginComponent />
      </div>
    </div>
  );
};

export default HomePage;
