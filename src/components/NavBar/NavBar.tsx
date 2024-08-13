import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../../assets/Home.svg';
import Calender from '../../assets/calender.svg';
import Bike from '../../assets/bike.svg';
import Flag from '../../assets/Flag.svg';
import Coupon from '../../assets/coupon.svg';

const NavBar = () => {
  const [active, setActive] = useState<string>('');
  const navigate = useNavigate();

  const handleNavClick = (name: string, path: string) => {
    setActive(name);
    navigate(path);
  };

  const navItems = [
    { name: 'home', path: '/home', icon: Home, label: '홈' },
    { name: 'calendar', path: '/calendar', icon: Calender, label: '캘린더' },
    { name: 'bike', path: '/bike', icon: Bike, label: '바이킹' },
    { name: 'flag', path: '/flag', icon: Flag, label: '목표' },
    { name: 'coupon', path: '/coupon', icon: Coupon, label: '쿠폰' },
  ];

  const renderNavItem = (item: { name: string, path: string, icon: string, label: string }) => (
    <div
      key={item.name}
      className={`flex flex-col space-y-2 items-center cursor-pointer ${active === item.name ? 'text-mainBlack' : ''}`}
      onClick={() => handleNavClick(item.name, item.path)}
    >
      <img
        src={item.icon}
        width={33}
        height={33}
        alt={item.label}
        className={`${
          active === item.name ? 'filter invert-[100%] sepia-[0%] saturate-[0%] hue-rotate-[0deg] brightness-[0%] contrast-[0%]' : ''
        } hover:filter hover:invert-[100%] hover:sepia-[0%] hover:saturate-[0%] hover:hue-rotate-[0deg] hover:brightness-[0%] hover:contrast-[0%]`}
      />
      {item.label}
    </div>
  );

  return (
    <div className="flex flex-row space-x-12 font-Pretendard justify-center text-[#AAAAAA] text-[12px] mb-[12px]">
      {navItems.map(renderNavItem)}
    </div>
  );
};

export default NavBar;
