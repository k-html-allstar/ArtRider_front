import { useRef, useEffect, useState } from "react";
import { spotProps } from "../../types/bikingTypes";

type NaverMapProps = {
  location: { lat: number; lng: number } | null;
  coords: spotProps[] | null;
};

const NaverMap = ({ location, coords }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const initialLocation = location || { lat: 37.36681775, lng: 127.10809985 };
      const centerLocation = new naver.maps.LatLng(initialLocation.lat, initialLocation.lng);

      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: centerLocation,
        zoom: 18,
      });

      setMap(mapInstance);
    }
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (map && location) {
      const { lat, lng } = location;
      const newLocation = new naver.maps.LatLng(lat, lng);

      // 기존 마커 삭제
      if (marker) {
        marker.setMap(null);
      }

      const markerContent = `
                <div style="back: 2px solid white">
                    <div style="border: 6.5px solid rgb(228, 111, 90); background-color: white;  border-radius: 50%; width: 20px; height: 20px">
                    </div>
                </div>
            `;

      // 새로운 마커 생성
      const newMarker = new naver.maps.Marker({
        position: newLocation,
        map,
        icon: {
          content: markerContent,
          anchor: new naver.maps.Point(10, 10), // 마커의 위치 설정
        },
      });

      // 마커 상태 업데이트
      setMarker(newMarker);

      // 지도 중심을 사용자의 위치에서 특정 픽셀만큼 이동된 좌표로 설정
      const projection = map.getProjection();
      const positionPoint = projection.fromCoordToOffset(newLocation); // LatLng -> 화면 좌표로 변환

      // 특정 픽셀만큼 이동 (예: 200px 위, 200px 오른쪽)
      const offsetPoint = new naver.maps.Point(positionPoint.x, positionPoint.y - 200);

      // 화면 좌표를 다시 LatLng로 변환
      const newCenter = projection.fromOffsetToCoord(offsetPoint);

      // 지도 중심 이동
      map.setCenter(newCenter);

      if (coords) {
        const pathArray = coords.map((coord) => new naver.maps.LatLng(coord.y, coord.x));

        // Polyline을 생성하여 지도에 표시
        if (map && naver) {
          new naver.maps.Polyline({
            map, // 사용할 지도 객체
            path: pathArray, // LatLng 객체 배열
            strokeColor: "gray", // 선 색상
            strokeWeight: 5, // 선 두께
          });
        }
      }
    }
  }, [location, map]);

  // useEffect(() => {
  //     const { naver } = window;
  //     if (map && location) {
  //         const { lat, lng } = location;
  //         const newLocation = new naver.maps.LatLng(lat, lng);

  //         // 기존 마커 삭제
  //         if (marker) {
  //             marker.setMap(null);
  //         }

  //         const markerContent = `
  //             <div style="back: 2px solid white">
  //                 <div style="border: 6.5px solid rgb(228, 111, 90); background-color: white;  border-radius: 50%; width: 20px; height: 20px">
  //                 </div>
  //             </div>
  //         `;

  //         // 새로운 마커 생성
  //         const newMarker = new naver.maps.Marker({
  //             position: newLocation,
  //             map,
  //             icon: {
  //                 content: markerContent,
  //                 anchor: new naver.maps.Point(10, 10),  // 마커의 위치 설정
  //             },
  //         });

  //         // 마커 상태 업데이트
  //         setMarker(newMarker);

  //         // 지도 중심 이동 (필요 시)
  //         map.setCenter(newLocation);

  //         if (coords) {
  //             const pathArray = coords.map(coord => new naver.maps.LatLng(coord.y, coord.x));

  //             // Polyline을 생성하여 지도에 표시
  //             if (map && naver) {
  //                 new naver.maps.Polyline({
  //                     map,  // 사용할 지도 객체
  //                     path: pathArray, // LatLng 객체 배열
  //                     strokeColor: 'gray', // 선 색상
  //                     strokeWeight: 5, // 선 두께
  //                 });
  //             }
  //         }

  //     }
  // }, [location, map]);

  return <div ref={mapRef} style={{ width: "500px", height: "500px" }} />;
};

export default NaverMap;
