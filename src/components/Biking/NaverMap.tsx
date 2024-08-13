import { useRef, useEffect, useState } from "react";
import { spotProps } from "../../types/bikingTypes";
import focused from "../../assets/focused.svg"; // 트래킹
import focus from "../../assets/focus.svg";
import pause from "../../assets/pause.svg";
import startIcon from "../../assets/start.svg";

type NaverMapProps = {
  location: { lat: number; lng: number };
  coords: spotProps[] | null;
  historyCoords: spotProps[] | null;
};

const NaverMap = ({ location, coords, historyCoords }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [spotMarker, setSpotMarker] = useState<naver.maps.Marker | null>(null); // Spot Marker 상태 추가
  const [isFinished, setIsFinished] = useState<boolean>(false);

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
    if (map) {
      if (coords) {
        const pathArray = coords.map((coord) => new naver.maps.LatLng(coord.y, coord.x));

        // Polyline을 생성하여 지도에 표시
        // 목표
        if (map && naver) {
          new naver.maps.Polyline({
            map, // 사용할 지도 객체
            path: pathArray, // LatLng 객체 배열
            strokeColor: "lightgray", // 선 색상
            strokeWeight: 3, // 선 두께
          });
        }
      }

      if (historyCoords) {
        const historyArray = historyCoords.map((coord) => new naver.maps.LatLng(coord.y, coord.x));

        // Polyline을 생성하여 지도에 표시
        // 걸어온
        if (map && naver) {
          new naver.maps.Polyline({
            map, // 사용할 지도 객체
            path: historyArray, // LatLng 객체 배열
            strokeColor: "#16be5c", // 선 색상
            strokeWeight: 5, // 선 두께
          });
        }
      }
    }
  }, [map, historyCoords]);

  // 내 위치에 마커 찍기
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
    }
  }, [location, map]);

  // Spot Marker
  useEffect(() => {
    const { naver } = window;

    if (map) {
      const x = 127.2404362018919;
      const y = 37.28178745513513;
      const newLocation = new naver.maps.LatLng(y, x);

      // 기존 Spot Marker 삭제
      if (spotMarker) {
        spotMarker.setMap(null);
      }

      const markerContent = `
            <div style="back: 2px solid white">
                <div style="border: 4px solid #16BE5C; background-color: white;  border-radius: 50%; width: 20px; height: 20px">
                </div>
            </div>
          `;

      // 새로운 마커 생성
      const newSpotMarker = new naver.maps.Marker({
        position: newLocation,
        map,
        icon: {
          content: markerContent,
          anchor: new naver.maps.Point(10, 10), // 마커의 위치 설정
        },
      });

      // 마커 상태 업데이트
      setSpotMarker(newSpotMarker);
    }
  }, [map]);

  useEffect(() => {
    const { naver } = window;

    if (map && location && isClicked) {
      const { lat, lng } = location;
      const newLocation = new naver.maps.LatLng(lat, lng);

      // 트래킹 모드일 때
      const projection = map.getProjection();
      const positionPoint = projection.fromCoordToOffset(newLocation); // LatLng -> 화면 좌표로 변환

      // 특정 픽셀만큼 이동 (예: 200px 위, 200px 오른쪽)
      const offsetPoint = new naver.maps.Point(positionPoint.x, positionPoint.y);

      // 화면 좌표를 다시 LatLng로 변환
      const newCenter = projection.fromOffsetToCoord(offsetPoint);

      // 지도 중심 이동
      map.setCenter(newCenter);
    }
  }, [isClicked, map, location]);

  return (
    <div className="h-full w-full  z-50  ">
      <div ref={mapRef} className="w-500 h-700"></div>
      <div className="absolute left-5 bottom-28 z-60 cursor-pointer  bg-white w-48 h-48 flex justify-center items-center rounded-full">
        <div className="w-24 h-24 " onClick={() => setIsClicked(!isClicked)}>
          {isClicked ? <img src={focused} /> : <img src={focus} />}
        </div>
      </div>

      <div
        className="absolute left-[50%] right-[50%] bottom-[140px] w-63 h-63 cursor-pointer"
        onClick={() => setStart(true)}
        style={{ transform: "translate(-50%, 50%)" }}
      >
        {start ? <img src={startIcon} /> : <img src={pause} onClick={() => setIsFinished(true)} />}
      </div>

      {isFinished && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-[9999]">
          <div
            className="absolute top-[50%] left-[50%] z-[10000] w-362 h-292 rounded-20 bg-white p-20"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex items-center justify-between ">
              <div className="w-full flex flex-col items-center text-[#676767] font-19">
                <div>축하해요!</div>
                <div>목표한 거리를 모두 완주했어요</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10">
              <button className="bg-[#E2E2E2] flex justify-center items-center py-15 px-20 rounded-12 text-[#727272] text-16 font-medium">
                닫기
              </button>
              <button className=" flex-grow bg-bg-primary flex justify-center items-center py-15 rounded-12 text-white text-16 font-medium">
                캘린더 탭으로 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  3;
};

export default NaverMap;
