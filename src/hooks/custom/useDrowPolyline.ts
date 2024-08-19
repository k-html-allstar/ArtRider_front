import { useEffect } from "react";
import { spotProps } from "../../types/bikingTypes";

const useDrawPolyline = (
  map: naver.maps.Map | null,
  coords: spotProps[] | null,
  historyCoords: spotProps[] | null
) => {
  useEffect(() => {
    const { naver } = window;
    if (map) {
      if (coords) {
        const pathArray = coords.map((coord) => new naver.maps.LatLng(coord.y, coord.x));
        new naver.maps.Polyline({
          map,
          path: pathArray,
          strokeColor: "lightgray",
          strokeWeight: 3,
        });
      }

      if (historyCoords) {
        const historyArray = historyCoords.map((coord) => new naver.maps.LatLng(coord.y, coord.x));
        new naver.maps.Polyline({
          map,
          path: historyArray,
          strokeColor: "#16be5c",
          strokeWeight: 5,
        });
      }
    }
  }, [map, coords, historyCoords]);
};

export default useDrawPolyline;
