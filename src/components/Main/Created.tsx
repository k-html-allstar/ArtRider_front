import DragonIcon from "../../assets/icon2.svg";

export default function Created() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-20">
      <div className="flex justify-center items-center rounded-full w-80 h-80 bg-bg-secondary">
        <img src={DragonIcon} alt="DragonIcon" />
      </div>
      <div className="text-[#676767] font-semibold text-18">
        <span className="block">경로가 생성됐습니다!</span>
        <span className="block">이제 즐기러 가볼까요?</span>
      </div>
    </div>
  );
}
