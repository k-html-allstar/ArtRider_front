import React, { useEffect } from 'react'
import { coordProps, spotProps } from '../../types/bikingTypes'
import axios from 'axios';

type DirectionProps = {
    setDistance: React.Dispatch<React.SetStateAction<number>>;
    missionCoords: coordProps[];
    setHistoryCoords: React.Dispatch<React.SetStateAction<spotProps[]>>;
}

const Direction = ({ setDistance, missionCoords, setHistoryCoords}: DirectionProps) => {

    const loadTmapScript = () => {
        return new Promise<void>((resolve, reject) => {
            if (window.Tmapv2) {
                resolve(); // 이미 로드된 경우
                return;
            }
            const script = document.createElement('script');
            script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${import.meta.env.VITE_TMAP_API_KEY}`;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Tmap script'));
            document.body.appendChild(script);
        });
    };

    const initTmap = async (position: coordProps) => {
        try {
            await loadTmapScript();

            if (!window.Tmapv2) {
                throw new Error('Tmapv2 is not available');
            }

            // API 요청
            const response = await axios.post(
                "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
                {
                    startX: position.startX,
                    startY: position.startY,
                    endX: position.endX,
                    endY: position.endY,
                    reqCoordType: "WGS84GEO",
                    resCoordType: "EPSG3857",
                    startName: "출발지",
                    endName: "도착지"
                },
                { headers: { appKey: import.meta.env.VITE_TMAP_API_KEY } }
            );

            const resultData = response.data.features;
            const drawInfoArr: Tmapv2.LatLng[] = [];

            // 결과 처리
            const tDistance = resultData[0].properties.totalDistance / 1000; // km로 변환
            setDistance(prevDistance => prevDistance + tDistance);

            resultData.forEach((data: any) => {
                const geometry = data.geometry;

                if (geometry.type === "LineString") {
                    geometry.coordinates.forEach((coords: number[]) => {
                        const latlng = new window.Tmapv2.Point(coords[0], coords[1]);
                        const convertPoint = window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                        drawInfoArr.push(new window.Tmapv2.LatLng(convertPoint._lat, convertPoint._lng));
                    });
                } 
            });

            const latLngCoords = drawInfoArr.map(coord => ({
                lat: coord._lat,
                lng: coord._lng
            }));

            // historyCoords 업데이트
            setHistoryCoords(prevCoords => [...prevCoords, ...latLngCoords]);

        } catch (error) {
            console.error("Error initializing Tmap:", error);
        }
    };

    // missionCoords 안에 있는 좌표 반복문 
    useEffect(() => {
        missionCoords.forEach(position => {
            initTmap(position);
        });
    }, []);


  return (
    <div></div>
  )
}

export default Direction