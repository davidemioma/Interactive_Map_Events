"use client";

import React, { useState } from "react";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const [defaultPosition, setDefaultPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);

  const icon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      //@ts-ignore
      center={defaultPosition}
      zoom={13}
      className="w-full h-full rounded-2xl overflow-hidden"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        //@ts-ignore
        icon={icon}
        position={defaultPosition}
        eventHandlers={{
          onclick: () => {},
        }}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
