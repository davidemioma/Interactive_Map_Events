"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  position: [number, number];
  zoomLevel: number;
}

const FlyToMarker = ({ position, zoomLevel }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      const zoom = zoomLevel ?? map.getZoom();

      map.flyTo(position, zoom, {
        duration: 1,
      });
    }
  }, [map, position, zoomLevel]);

  return null;
};

export default FlyToMarker;
