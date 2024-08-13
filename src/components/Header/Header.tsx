import hamburgermenu from "../../assets/hamburgermuenu.svg";

const Header = () => {
  return (
    <div className="flex flex-row px-14 py-2 mt-8 justify-between items-center">
      <div className="font-Pretendard text-center font-bold mt-[6px] text-[22px] text-bg-primary">
        ArtRider
      </div>
      <img src={hamburgermenu} width={24} height={24} alt="logo" className="mt-4" />
    </div>
  );
};

export default Header;
