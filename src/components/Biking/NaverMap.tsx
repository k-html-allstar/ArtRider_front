import { useRef, useState } from "react";
import Lottie from "react-lottie";
import { spotProps } from "../../types/bikingTypes";
import focused from "../../assets/focused.svg"; // 트래킹
import focus from "../../assets/focus.svg";
import pause from "../../assets/pause.svg";
import startIcon from "../../assets/start.svg";
import animationData from "../../assets/award.json";
import GainCoupon from "./GainCoupon";
import useInitializeMap from "../../hooks/custom/useInitializeMap";
import useDrawPolyline from "../../hooks/custom/useDrowPolyline";
import useMarker from "../../hooks/custom/useMarker";
import useSpotMarker from "../../hooks/custom/useSpotMarker";
import useTrackingMode from "../../hooks/custom/useTrackingMode";
import useCoupon from "../../hooks/custom/useCoupon";

type NaverMapProps = {
  location: { lat: number; lng: number };
  coords: spotProps[] | null;
  historyCoords: spotProps[] | null;
};

const NaverMap = ({ location, coords, historyCoords }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const map = useInitializeMap(mapRef, location);
  useDrawPolyline(map, coords, historyCoords);
  useMarker(map, location);
  useSpotMarker(map);
  useTrackingMode(map, location, isClicked);
  const showCoupon = useCoupon(15000);

  return (
    <div className="h-full w-full z-50">
      <div ref={mapRef} className="w-500 h-700"></div>
      <div className="absolute left-5 bottom-28 z-60 cursor-pointer bg-white w-48 h-48 flex justify-center items-center rounded-full">
        <div className="w-24 h-24" onClick={() => setIsClicked(!isClicked)}>
          {isClicked ? <img src={focused} /> : <img src={focus} />}
        </div>
      </div>

      <div
        className="absolute left-[50%] right-[50%] bottom-[140px] w-63 h-63 cursor-pointer"
        onClick={() => setStart(true)}
        style={{ transform: "translate(-50%, 50%)" }}
      >
        {start ? <img src={startIcon} /> : <img src={pause} onClick={() => setIsFinished(true)} />}
      </div>

      {showCoupon && <GainCoupon timeToShow={3000} />}

      {isFinished && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-[9999]">
          <div
            className="absolute top-[50%] left-[50%] z-[10000] w-362 h-320 rounded-20 bg-white p-20"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex flex-col items-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={150}
                width={150}
              />
              <div className="w-full flex flex-col items-center text-[#676767] text-19 mb-20">
                <div>축하해요!</div>
                <div>목표한 거리를 모두 완주했어요</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10">
              <button className="bg-[#E2E2E2] flex justify-center items-center py-15 px-20 rounded-12 text-[#727272] text-16 font-medium min-w-100">
                닫기
              </button>
              <button className=" flex-grow bg-bg-primary flex justify-center items-center py-15 rounded-12 text-white text-16 font-medium">
                공유하러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NaverMap;
