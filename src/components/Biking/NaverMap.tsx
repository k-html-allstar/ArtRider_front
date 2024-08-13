import { useRef, useEffect, useState } from 'react';

type NaverMapProps = {
    location: { lat: number, lng: number } | null;
}

const NaverMap = ({ location }: NaverMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { naver } = window;
        if (mapRef.current && naver && location) {
            const { lat, lng } = location;
            const centerLocation = new naver.maps.LatLng(lat, lng);

            const map = new naver.maps.Map(mapRef.current, {
                center: centerLocation,
                zoom: 13, // 지도 확대 정도
            });

            const markerContent = `
                <div style="back: 2px solid white">
                    <div style="border: 6.5px solid rgb(228, 111, 90); background-color: white;  border-radius: 50%; width: 20px; height: 20px">
                    </div>
                </div>
                
            `;

            // 현재 내 위치 마커 표시
            new naver.maps.Marker({
                // 생성될 마커의 위치
                position: new naver.maps.LatLng(lat, lng),
                // 마커를 표시할 Map 객체
                map,
                icon: {
                    content: markerContent,
                    anchor: new naver.maps.Point(0, 50),  // 마커의 위치 설정
                },
            });

            // LocalStorage에서 path 데이터를 가져옴
            const savedPath = localStorage.getItem('historyCoords');
            if (savedPath) {
                try {
                    // JSON 문자열을 객체로 변환
                    const pathArray = JSON.parse(savedPath);

                    // LatLng 객체 배열로 변환
                    const path = pathArray.map((coord: { lat: number; lng: number }) =>
                        new naver.maps.LatLng(coord.lat, coord.lng)
                    );

                    console.log(path)

                    // Polyline 생성
                    new naver.maps.Polyline({
                        map,
                        path,
                        strokeColor: 'gray', // 선 색상
                        strokeWeight: 5, // 선 두께
                    });
                } catch (error) {
                    console.error('Error parsing path data from localStorage:', error);
                }
            }
        }
    }, [location]); // `location`이 변경될 때만 실행

    return (
        <div ref={mapRef} style={{ width: '500px', height: '500px' }}>NaverMap</div>
    );
};

export default NaverMap;
