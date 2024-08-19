import cls from "../../pages/utils/cls";

const RemainingDistance = ({
  username,
  distance,
  ...props
}: { username: string; distance: number } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cls(
        "p-20 flex justify-between items-center bg-white w-full rounded-20",
        props.className ?? ""
      )}
    >
      <div className="text-[#767676] text-18 font-semibold">
        <h3 className="">{username}님이</h3>
        <h3>목표 달성까지 남은 거리</h3>
      </div>
      <div className="">
        <span className="font-semibold text-32 text-[#545454]">{distance}</span>
        <span className="text-[#545454]">km</span>
      </div>
    </div>
  );
};

export default RemainingDistance;
