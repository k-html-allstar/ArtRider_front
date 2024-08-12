import { useRef, useEffect } from 'react'

const Run = () => {
    const mapRef = useRef(null);
    const lat = 37.36681775;
    const lng = 127.10809985;      
    
    useEffect(() => {
      const { naver } = window;
      if (mapRef.current && naver) {
        const location = new naver.maps.LatLng(lat, lng);
        const map = new naver.maps.Map(mapRef.current, {
          center: location,
          zoom: 13, // 지도 확대 정도
        });

        new naver.maps.Marker({
          position: location,
          map,
        });

        new naver.maps.Polyline({
            map,
            path: [
                new naver.maps.LatLng(37.359924641705476, 127.1148204803467),
                new naver.maps.LatLng(37.36343797188166, 127.11486339569092),
                new naver.maps.LatLng(37.368520071054576, 127.11473464965819),
                new naver.maps.LatLng(37.3685882848096, 127.1088123321533),
                new naver.maps.LatLng(37.37295383612657, 127.10876941680907),
                new naver.maps.LatLng(37.38001321351567, 127.11851119995116),
                new naver.maps.LatLng(37.378546827477855, 127.11984157562254),
                new naver.maps.LatLng(37.376637072444105, 127.12052822113036),
                new naver.maps.LatLng(37.37530703574853, 127.12190151214598),
                new naver.maps.LatLng(37.371657839593894, 127.11645126342773),
                new naver.maps.LatLng(37.36855417793982, 127.1207857131958)
            ]
        })
      }
    }, []);
    
    return (
       <div ref={mapRef} style={{ width: "500px", height: "500px" }}></div>
    );
}

export default Run;