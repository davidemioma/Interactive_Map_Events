"use client";

import React from "react";
import { toast } from "sonner";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";
import FlyToMarker from "./FyToMarker";
import { Event } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { MapIcon, StarIcon } from "lucide-react";
import useActiveEvent from "@/hooks/use-active-event";
import { toggleFavourite } from "@/actions/toggleFavourite";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
  events: Event[];
  favouriteEventsIds: string[];
}

const Map = ({ events, favouriteEventsIds }: Props) => {
  const eventState = useActiveEvent();

  const { activeEvent, setActiveEvent } = eventState;

  const defaultPosition: [number, number] = [51.505, -0.09];

  const { execute, isLoading } = useAction(toggleFavourite, {
    onSuccess: (data) => {
      toast.success("Action successful");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const icon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const onClickHandler = (event: Event) => {
    execute({
      eventId: event.id,
      inFavourites: favouriteEventsIds.includes(event.id),
    });
  };

  return (
    <MapContainer
      //@ts-ignore
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full rounded-2xl overflow-hidden"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {events.map((event) => (
        <Marker
          key={event.id}
          //@ts-ignore
          position={event.position}
          //@ts-ignore
          icon={icon}
          eventHandlers={{
            click: () => {
              if (!event) return;

              setActiveEvent(event);
            },
          }}
        ></Marker>
      ))}

      {activeEvent?.id && (
        <Popup
          //@ts-ignore
          position={activeEvent.position}
          className="bg-[#ededed] z-50 text-[#333333] cursor-pointer overflow-hidden"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <MapIcon className="w-5 h-5 text-[rgb(111,207,151)]" />

              <h2 className="text-base text-[rgb(111,207,151)] font-bold">
                {activeEvent.title}
              </h2>
            </div>

            <div className="bg-[rgb(111,207,151)] w-[35%] h-0.5 rounded-full" />
          </div>

          <p className="text-xs tracking-wide">{activeEvent.description}</p>

          <Button
            className="text-xs text-[rgb(111,207,151)] font-bold"
            size="sm"
            variant="outline"
            disabled={isLoading}
            onClick={() => onClickHandler(activeEvent)}
          >
            {favouriteEventsIds.includes(activeEvent.id) ? (
              <span className="flex items-center">
                <StarIcon
                  className="w-4 h-4 mr-2 text-[#fdc401]"
                  fill="#fdc401"
                />
                Favourite
              </span>
            ) : (
              <span className="flex items-center">
                <StarIcon className="w-4 h-4 mr-2 " />
                Favourite
              </span>
            )}
          </Button>
        </Popup>
      )}

      {activeEvent && (
        <FlyToMarker
          //@ts-ignore
          position={activeEvent.position}
          zoomLevel={15}
        />
      )}
    </MapContainer>
  );
};

export default Map;
