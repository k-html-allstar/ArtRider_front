import { useState, useEffect } from "react";
import { spotProps } from "../../types/bikingTypes";

const useLocationTracker = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [historyCoords, setHistoryCoords] = useState<spotProps[]>([]);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };
            setLocation(newLocation);

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

  return { location, historyCoords };
};

export default useLocationTracker;
