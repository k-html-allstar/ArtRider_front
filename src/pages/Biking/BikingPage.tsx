import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import { coordProps, spotProps } from '../../types/bikingTypes';
import Direction from '../../components/Biking/Direction';
import NaverMap from '../../components/Biking/NaverMap';

const BikingPage = () => {
    // const missionCoords: coordProps[] = [];
    
    const [distance, setDistance] = useState<number>(0);
    // const [historyCoords, setHistoryCoords] = useState<spotProps[]>([]);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const missionCoords: coordProps[] = [
      { startY: 37.2825145, startX: 127.2405551, endY: 37.2806338, endX: 127.2316009 },
      // { startY: 37.36, startX: 127.1142, endY: 37.35, endX: 127.114813 },
      // { startY: 37.37, startX: 127.11485, endY: 37.36, endX: 127.1142 },
      // { startY: 37.38, startX: 127.11483, endY: 37.37, endX: 127.11485},
      // { startY: 37.39, startX: 127.1145, endY: 37.38, endX: 127.11483 },
  ]

    // TODO: API 사용과다로 일단 저장 
    const [historyCoords, setHistoryCoords] = useState<spotProps[]>(() => {
        const savedCoords = localStorage.getItem('historyCoords');
        return savedCoords ? JSON.parse(savedCoords) : [];
    });
    
    useEffect(() => {
      // Geolocation API를 사용하여 현재 위치를 가져옵니다.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setLocation({ lat: latitude, lng: longitude });
              },
              (error) => {
                  console.error('Error getting location:', error);
                  // 기본 위치 설정
                  setLocation({ lat: 37.36681775, lng: 127.10809985 });
              }
          );
      } else {
          console.error('Geolocation is not supported by this browser.');
          // Geolocation이 지원되지 않는 경우 기본 위치 설정
          setLocation({ lat: 37.36681775, lng: 127.10809985 });
      }
  }, []);

    useEffect(() => {
        // historyCoords가 변경될 때마다 localStorage에 저장합니다.
        localStorage.setItem('historyCoords', JSON.stringify(historyCoords));
    }, [historyCoords]);

    // const [loading, setLoading] = useState<boolean>(false);

    // if (loading) {
    //     <div>생성중...</div>
    // }

  return (
    <div>
        <Header />
        <Direction setDistance={setDistance} missionCoords={missionCoords} setHistoryCoords={setHistoryCoords} />

        <NaverMap location={location} />

    </div>
  )
}

export default BikingPage;