import { useEffect, useState } from "react";

const useMarker = (map: naver.maps.Map | null, location: { lat: number; lng: number }) => {
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    const { naver } = window;

    if (map && location) {
      const { lat, lng } = location;
      const newLocation = new naver.maps.LatLng(lat, lng);

      if (marker) {
        marker.setMap(null);
      }

      const markerContent = `
          <div style="back: 2px solid white">
              <div style="border: 6.5px solid rgb(228, 111, 90); background-color: white;  border-radius: 50%; width: 20px; height: 20px">
              </div>
          </div>
        `;

      const newMarker = new naver.maps.Marker({
        position: newLocation,
        map,
        icon: {
          content: markerContent,
          anchor: new naver.maps.Point(10, 10),
        },
      });

      setMarker(newMarker);
    }
  }, [location, map]);
};

export default useMarker;
