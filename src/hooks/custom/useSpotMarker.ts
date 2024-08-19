import { useEffect, useState } from "react";

const useSpotMarker = (map: naver.maps.Map | null) => {
  const [spotMarker, setSpotMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    const { naver } = window;

    if (map) {
      const x = 127.2404362018919;
      const y = 37.28178745513513;
      const newLocation = new naver.maps.LatLng(y, x);

      if (spotMarker) {
        spotMarker.setMap(null);
      }

      const markerContent = `
        <div style="back: 2px solid white">
            <div style="border: 4px solid #16BE5C; background-color: white;  border-radius: 50%; width: 20px; height: 20px">
            </div>
        </div>
        `;

      const newSpotMarker = new naver.maps.Marker({
        position: newLocation,
        map,
        icon: {
          content: markerContent,
          anchor: new naver.maps.Point(10, 10),
        },
      });

      setSpotMarker(newSpotMarker);
    }
  }, [map]);
};

export default useSpotMarker;
