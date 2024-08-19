import { useState, useEffect } from "react";
import { spotProps } from "../../types/bikingTypes";
import { $axios } from "../../lib/axios";
import axios from "axios";

const useMission = (location: { lat: number; lng: number } | null, level: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCreatedModal, setShowCreatedModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<spotProps[]>([]); // coords를 상태로 관리
  const [missionStarted, setMissionStarted] = useState(false);

  const postMission = async (location: { lat: number; lng: number }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_AI_URL}/mission`,
        {
          latitude: location.lat,
          longitude: location.lng,
          missionLevel: level,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedCoords = response.data.coordinates;
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

  useEffect(() => {
    if (location && !missionStarted) {
      postMission(location);
      setMissionStarted(true);
    }
  }, [location, missionStarted]);

  return { isLoading, showCreatedModal, coords };
};

export default useMission;
