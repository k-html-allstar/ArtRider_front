declare namespace Tmapv2 {
    class Map {
        constructor(container: string, options: MapOptions);
        on(event: string, callback: () => void): void;
    }
    
    class LatLng {
        constructor(lat: number, lng: number);
    }

    class Marker {
        constructor(options: MarkerOptions);
    }
    
    class Polyline {
        constructor(options: PolylineOptions);
    }
    
    class Point {
        constructor(x: number, y: number);
    }

    class Projection {
        static convertEPSG3857ToWGS84GEO(point: Point): { _lat: number, _lng: number };
    }
    
    interface MapOptions {
        center: LatLng;
        width: string;
        height: string;
        zoom: number;
        zoomControl: boolean;
        scrollwheel: boolean;
    }
    
    interface MarkerOptions {
        position: LatLng;
        icon: string;
        iconSize: Size;
        map: Map;
    }

    interface PolylineOptions {
        path: LatLng[];
        strokeColor: string;
        strokeWeight: number;
        map: Map;
    }

    interface Size {
        new(width: number, height: number): Size;
    }
}
