import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { spotProps } from "../../types/bikingTypes";
import NaverMap from "../../components/Biking/NaverMap";
import NavBar from "../../components/NavBar/NavBar";

const BikePage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // TODO: BE 통신 (원하는 경로)
  const coords: spotProps[] = [
    { y: 37.2820329, x: 127.2412078 },
    { y: 37.2828274, x: 127.2409512 },
    { y: 37.2828108, x: 127.2409721 },
    { y: 37.2827259, x: 127.2410808 },
    { y: 37.2800636, x: 127.2365217 },
    { y: 37.2820329, x: 127.2412078 },
    { y: 37.2800676, x: 127.2365219 },
  ];
  coords.push(coords[0]);

  const [historyCoords, setHistoryCoords] = useState<spotProps[]>([
    // { y: 37.2820329, x: 127.2365224 },
    // { y: 37.2828274, x: 127.2409512 },
    // { y: 37.2828108, x: 127.2409721 },
    // { y: 37.2827259, x: 127.2410808 },
    // { y: 37.2800636, x: 127.2365217 },
    // { y: 37.2800676, x: 127.2365219 },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: 5초마다 좌표 추가 -> 배열에 값이 없을 때 마다 추가로 변경
  useEffect(() => {
    // 5초마다 좌표를 추가하는 인터벌 설정
    const intervalId = setInterval(() => {
      if (currentIndex < coords.length) {
        const newCoord = coords[currentIndex];
        setHistoryCoords((prevHistory) => {
          // 중복된 좌표가 없는 경우에만 추가
          if (!prevHistory.some((coord) => coord.y === newCoord.y && coord.x === newCoord.x)) {
            return [...prevHistory, newCoord];
          }
          return prevHistory;
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  // 현재 위치 업데이트
  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };
            setLocation(newLocation);

            // historyCoords에 현재 위치가 없는 경우에만 추가
            setHistoryCoords((prevHistory) => {
              if (
                !prevHistory.some(
                  (coord) =>
                    Math.abs(coord.y - latitude) < 0.0001 && Math.abs(coord.x - longitude) < 0.0001
                )
              ) {
                return [...prevHistory, { y: latitude, x: longitude }];
              }
              return prevHistory;
            });
          },
          (error) => {
            console.error("위치 정보 가져오기 오류:", error);
            setLocation({ lat: 37.36681775, lng: 127.10809985 });
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
          }
        );
      } else {
        setLocation({ lat: 37.36681775, lng: 127.10809985 });
      }
    };

    // 최초 위치 업데이트
    updateLocation();

    // 0.5초마다 위치 업데이트
    const locationIntervalId = setInterval(updateLocation, 500);

    return () => clearInterval(locationIntervalId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {location && <NaverMap location={location} coords={coords} historyCoords={historyCoords} />}
      </div>
      <NavBar />
    </div>
  );
};

export default BikePage;
