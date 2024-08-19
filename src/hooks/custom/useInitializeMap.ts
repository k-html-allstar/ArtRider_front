import { useEffect, useState } from "react";

const useInitializeMap = (
  mapRef: React.RefObject<HTMLDivElement>,
  location: { lat: number; lng: number }
) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const initialLocation = location || { lat: 37.36681775, lng: 127.10809985 };
      const centerLocation = new naver.maps.LatLng(initialLocation.lat, initialLocation.lng);

      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: centerLocation,
        zoom: 20,
      });

      setMap(mapInstance);
    }
  }, [location, mapRef]);

  return map;
};

export default useInitializeMap;
