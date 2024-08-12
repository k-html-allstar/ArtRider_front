import React, { useEffect } from 'react';
import axios from 'axios';

type coordProps = {
    startX: string;
    startY: string;
    endX: string;
    endY: string;
}

// position을 coordProps 객체로 변환
const position: coordProps = {
    startX: "126.983937",
    startY: "37.564991",
    endX: "126.988940",
    endY: "37.566158"
};

const TMap: React.FC = () => {
    const appKey = import.meta.env.VITE_TMAP_API_KEY;
    


    // Tmap 스크립트 로드 함수
    const loadTmapScript = (appKey: string) => {
        return new Promise<void>((resolve, reject) => {
            if (window.Tmapv2) {
                resolve(); // 이미 로드된 경우
                return;
            }
            const script = document.createElement('script');
            script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${appKey}`;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Tmap script'));
            document.body.appendChild(script);
        });
    };

    // 지도 초기화 및 API 요청
    const initTmap = async (position: coordProps) => {
        try {
            await loadTmapScript(appKey);

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
                { headers: { appKey } }
            );

            const resultData = response.data.features;
            const drawInfoArr: Tmapv2.LatLng[] = [];

            // 결과 처리
            const tDistance = `총 거리 : ${(resultData[0].properties.totalDistance / 1000).toFixed(1)}km,`;
            const tTime = ` 총 시간 : ${(resultData[0].properties.totalTime / 60).toFixed(0)}분`;
            document.getElementById('result')!.textContent = tDistance + tTime;

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

            // TODO: 길찾기 좌표 저장
            console.log('drawInfoArr', drawInfoArr);

        } catch (error) {
            console.error("Error initializing Tmap:", error);
        }
    };

    useEffect(() => {
        initTmap(position);
    }, []);

    return (
        <div>
            <div id="map_div" style={{ width: "100%", height: "400px" }}></div>
            <p id="result"></p>
        </div>
    );
};

export default TMap;
