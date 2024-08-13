import { useState } from "react";
import arrowLeft from "../../assets/arrow_left.svg";
import arrowRight from "../../assets/arrow_right.svg";
import Creating from "./Creating";
import Created from "./Created";
import { useNavigate } from "react-router-dom";

const levelMapping = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

export default function CreateMission({
  selectedBtn,
  closeModal,
}: {
  selectedBtn: number | null;
  closeModal: () => void;
}) {
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const navigate = useNavigate();

  function changeLevel(btn: "left" | "right") {
    if (btn === "left") {
      if (level === "medium") {
        setLevel("easy");
      } else if (level === "hard") {
        setLevel("medium");
      }
    } else {
      if (level === "medium") {
        setLevel("hard");
      } else if (level === "easy") {
        setLevel("medium");
      }
    }
  }

  function createMission() {
    navigate("/bike", { state: level });
  }
  return (
    <div
      onClick={closeModal}
      className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-[9999]"
    >
      <div
        className="absolute top-[50%] left-[50%] z-[10000] w-362 h-292 rounded-20 bg-white p-20"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <h4 className="text-16 font-medium text-center mb-70">난이도 선택하기</h4>
        <div className="flex items-center justify-between mb-80">
          <button
            className="w-35 h-35 bg-[#EEEEEE] rounded-full flex justify-center items-center"
            onClick={() => changeLevel("left")}
          >
            <img src={arrowLeft} alt="arrowLeft" />
          </button>
          <span className="font-semibold text-[#676767] text-18">{levelMapping[level]}</span>
          <button
            className="w-35 h-35 bg-[#EEEEEE] rounded-full flex justify-center items-center"
            onClick={() => changeLevel("right")}
          >
            <img src={arrowRight} alt="arrowLeft" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={closeModal}
            className="bg-[#E2E2E2] flex justify-center items-center py-15 px-20 rounded-12 text-[#727272] text-16 font-medium"
          >
            취소하기
          </button>
          <button
            onClick={createMission}
            className=" flex-grow bg-bg-primary flex justify-center items-center py-15 rounded-12 text-white text-16 font-medium"
          >
            자동으로 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
