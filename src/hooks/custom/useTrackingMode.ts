import { useEffect } from "react";

const useTrackingMode = (
  map: naver.maps.Map | null,
  location: { lat: number; lng: number },
  isClicked: boolean
) => {
  useEffect(() => {
    const { naver } = window;

    if (map && location && isClicked) {
      const { lat, lng } = location;
      const newLocation = new naver.maps.LatLng(lat, lng);

      const projection = map.getProjection();
      const positionPoint = projection.fromCoordToOffset(newLocation);
      const offsetPoint = new naver.maps.Point(positionPoint.x, positionPoint.y);
      const newCenter = projection.fromOffsetToCoord(offsetPoint);

      map.setCenter(newCenter);
    }
  }, [isClicked, map, location]);
};

export default useTrackingMode;
