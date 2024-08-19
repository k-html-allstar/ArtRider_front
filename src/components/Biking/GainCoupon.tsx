import { username } from "../../data/dummy";
import cls from "../../pages/utils/cls";
import couponIcon from "../../assets/coupon2.svg";
import { useEffect, useState } from "react";

const GainCoupon = ({ timeToShow }: { timeToShow: number }) => {
  // timeToShow만큼 시간이 지나면 사라짐
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 타이머를 설정해 timeToShow 시간이 지나면 visible을 false로 변경
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeToShow);

    // 타이머를 클린업
    return () => clearTimeout(timer);
  }, [timeToShow]);

  // visible이 false이면 null을 반환하여 컴포넌트를 숨김
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute top-[180px] w-full px-20 rounded-20 overflow-hidden z-[600]">
      <div
        className={cls("p-20 flex justify-between items-center bg-bg-secondary w-full rounded-20")}
      >
        <div className="text-[#767676] text-18 font-semibold">
          <h3 className="">{username}님이</h3>
          <h3>목표 지점 쿠폰을 획득했어요!</h3>
        </div>
        <img src={couponIcon} />
      </div>
    </div>
  );
};

export default GainCoupon;
