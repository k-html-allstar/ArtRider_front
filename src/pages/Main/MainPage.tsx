import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import CreateMission from "../../components/Main/CreateMission";
import couponIcon from "../../assets/coupon2.svg";
import cls from "../utils/cls";
import { kmHistory } from "../../data/dummy";
import yongyong from "../../assets/icon.svg";
import mainpageBtnIcon1 from "../../assets/mainpage_btn_icon1.svg";
import mainpageBtnIcon2 from "../../assets/mainpage_btn_icon2.svg";
import mainpageBtnIcon3 from "../../assets/mainpage_btn_icon3.svg";
import mainpageBtnIcon4 from "../../assets/mainpage_btn_icon4.svg";
import { useState } from "react";

const menuBtns: {
  icon: string;
  iconSelected: string;
  subtitle: string;
  title: string;
  defaultColor: string;
}[] = [
  {
    icon: mainpageBtnIcon1,
    iconSelected: mainpageBtnIcon1,
    subtitle: "조아용이 추천한 경로로",
    title: "자전거 타기",
    defaultColor: "bg-primary",
  },
  {
    icon: mainpageBtnIcon2,
    iconSelected: mainpageBtnIcon2,
    subtitle: "내가 설정한 경로로",
    title: "자전거 타기",
    defaultColor: "bg-primary",
  },
  {
    icon: mainpageBtnIcon3,
    iconSelected: mainpageBtnIcon3,
    subtitle: "조아용이 추천한 경로로",
    title: "걸어가기",
    defaultColor: "primary-gray",
  },
  {
    icon: mainpageBtnIcon4,
    iconSelected: mainpageBtnIcon4,
    subtitle: "내가 설정한 경로로",
    title: "걸어가기",
    defaultColor: "primary-gray",
  },
];

const MainPage = () => {
  const curr_slide = 0; // 현재 슬라이드
  const [selectedBtn, setSelectedBtn] = useState<number | null>(null); // 선택된 버튼
  const [showCreateMissionModal, setShowCreateMissionModal] = useState(false); // 미션 생성 모달

  return (
    <>
      {showCreateMissionModal && (
        <CreateMission
          selectedBtn={selectedBtn}
          closeModal={() => setShowCreateMissionModal(false)}
        />
      )}
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <div className="pt-23 px-14">
            {/* 무료 쿠폰 받아가기 */}
            <section className="mb-8 rounded-12 bg-bg-secondary flex justify-between p-20 stroke-bg-strokeWhite">
              <div>
                <h4 className="text-14 text-bg-primary">용용이가 추천해준 경로로 타고</h4>
                <h3 className=" text-bg-primary font-bold text-16">무료 쿠폰 받아가기</h3>
              </div>
              <img src={couponIcon} />
            </section>
            {/* .... */}
            <section className="flex items-center justify-center gap-7 mb-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={cls(
                    "w-5 h-5 rounded-full",
                    curr_slide === index ? "bg-[#9A9A9A]" : "bg-[#D9D9D9]"
                  )}
                ></div>
              ))}
            </section>
            {/* 지금까지 달성한 거리 */}
            <section className="bg-[#fff] rounded-12 flex flex-col gap-46 pb-40 mb-14">
              <div className="p-20 flex justify-between items-end">
                <div className="text-primary-gray font-semibold text-18">
                  <h3>{`${import.meta.env.VITE_USER_NAME}`}님이</h3>
                  <h3>지금까지 달성한 거리</h3>
                </div>
                <div className="text-primary-gray">
                  <span className="font-bold text-24">{kmHistory}</span>
                  <span className="font-semibold">km</span>
                </div>
              </div>
              <div>
                <div className="w-full h-4 bg-[#EBEBEB]">
                  <div className="w-full h-full flex items-center">
                    <div className="w-[60%] h-full bg-bg-primary"></div>
                    <img
                      src={yongyong}
                      className="w-48 h-48 border-4 border-solid border-bg-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* 버튼 선택 */}
            <section className="flex flex-wrap justify-between items-center">
              {menuBtns.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedBtn(idx);
                    setShowCreateMissionModal(true);
                  }}
                  className={cls(
                    "rounded-12 w-174 h-174 p-20 flex flex-col items-center cursor-pointer",
                    selectedBtn === idx ? "bg-bg-primary" : "bg-mainWhite",
                    [0, 1].includes(idx) ? "mb-14" : ""
                  )}
                >
                  <img
                    src={selectedBtn === idx ? btn.iconSelected : btn.icon}
                    className={cls("mb-12")}
                  />
                  <div
                    className={cls(
                      selectedBtn === idx ? "text-mainWhite" : `text-${btn.defaultColor}`
                    )}
                  >
                    <span className={cls("block text-12")}>{btn.subtitle}</span>
                    <span className="font-semibold">{btn.title}</span>
                  </div>
                </button>
              ))}
            </section>
          </div>
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default MainPage;
