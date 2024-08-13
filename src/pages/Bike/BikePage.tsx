import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { spotProps } from "../../types/bikingTypes";
import NaverMap from "../../components/Biking/NaverMap";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Created from "../../components/Main/Created";
import Creating from "../../components/Main/Creating";
import Backdrop from "../../components/Utils/Backdrop";

const BikePage = () => {
  const { state: level } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCreatedModal, setShowCreatedModal] = useState<boolean>(false);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [coords, setCoords] = useState<spotProps[]>([]); // coords를 상태로 관리
  const [historyCoords, setHistoryCoords] = useState<spotProps[]>([]);
  const [missionStarted, setMissionStarted] = useState(false);

  // 서버에 POST 요청을 보내고 응답값을 coords에 저장
  const postMission = async (location: { lat: number; lng: number }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_AI_URL}/mission`,
        {
          // latitude: location.lat,
          // longitude: location.lng,
          latitude: 37.28202732 - 0.00025,
          longitude: 127.23995931 + 0.00021,
          missionLevel: level,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 서버 응답 데이터를 coords 상태로 저장
      const updatedCoords = response.data.coordinates;

      // 첫 번째 요소를 마지막에 추가하여 새로운 배열 생성
      if (updatedCoords.length > 0) {
        updatedCoords.push(updatedCoords[0]);
      }

      setCoords(updatedCoords);
      setIsLoading(false);
      setShowCreatedModal(true);

      setTimeout(() => {
        setShowCreatedModal(false);
      }, 2000);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  // 현재 위치 업데이트
  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };
            setLocation(newLocation);

            // 좌표 간 거리를 계산해서 distance에 더해줘
            // historyCoords에 현재 위치가 없는 경우에만 추가
            setHistoryCoords((prevHistory) => {
              if (
                !prevHistory.some(
                  (coord) =>
                    Math.abs(coord.y - latitude) < 0.000001 &&
                    Math.abs(coord.x - longitude) < 0.000001
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

  // location이 업데이트될 때마다 postMission 호출
  useEffect(() => {
    if (location && !missionStarted) {
      postMission(location); // location 객체를 그대로 전달
      setMissionStarted(true); // 미션 시작 상태로 변경
    }
  }, [location, missionStarted]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isLoading && (
        <Backdrop>
          <Creating />
        </Backdrop>
      )}
      {coords && showCreatedModal && (
        <Backdrop>
          <Created />
        </Backdrop>
      )}

      <div className="flex-grow">
        {location && coords.length !== 0 && (
          <NaverMap location={location} coords={coords} historyCoords={historyCoords} />
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default BikePage;
