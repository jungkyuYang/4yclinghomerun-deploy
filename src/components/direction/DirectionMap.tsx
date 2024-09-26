/* eslint-disable */
import { useEffect, useRef } from 'react';

import markerIcon from '@/assets/logo/KTwiz_logo.svg';

const DirectionMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const lat = 37.2997553;
  const lng = 127.0096685;
  const zoom = 15;
  const markerLat = 37.2997553;
  const markerLng = 127.0096685;
  const apiKey = import.meta.env.VITE_NAVER_MAP_API_KEY_ID;

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: zoom,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        minZoom: 10,
        maxZoom: 20,
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      // eslint-disable-next-line no-unused-vars
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(markerLat, markerLng),
        map: map,
        icon: {
          url: markerIcon,
          scaledSize: new naver.maps.Size(80, 80),
        },
      });
    };

    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [lat, lng, zoom, markerLat, markerLng]);

  return (
    <div ref={mapRef} className="h-[70vh] w-full border-4 border-kt-red-3" />
  );
};

export default DirectionMap;