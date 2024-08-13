import Lottie from "react-lottie";
import animationData from "../../assets/strategy-map.json";

export default function Creating() {
  return (
    <div className="p-20 flex flex-col items-center gap-10">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={170}
        width={170}
      />
      <span className="text-18 font-semibold text-[#676767]">
        조아용이 추천해준 경로 생성 중...
      </span>
    </div>
  );
}
