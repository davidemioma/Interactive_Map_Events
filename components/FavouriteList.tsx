"use client";

import React from "react";
import { Event } from "@prisma/client";
import { StarIcon } from "lucide-react";
import useActiveEvent from "@/hooks/use-active-event";

interface Props {
  events: Event[];
}

const FavouriteList = ({ events }: Props) => {
  const eventState = useActiveEvent();

  const { setActiveEvent } = eventState;

  return (
    <div className="w-full lg:max-w-[360px] bg-[#f9f9f9] dark:bg-[#262626] p-6 rounded-2xl border dark:border-[#363636] shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <StarIcon className="w-7 h-7 text-[#fdc401]" fill="#fdc401" />

        <h2 className="text-xl md:text-2xl font-extrabold">Favourite Events</h2>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => setActiveEvent(event)}
            className="bg-[#ededed] dark:bg-[#1e1e1e] w-full p-4 rounded-lg font-medium cursor-pointer shadow-md hover:opacity-70 transition"
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteList;
