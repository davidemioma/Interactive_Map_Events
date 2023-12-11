"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { ToggleFavourite } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { eventId, inFavourites } = data;

  let userFavourites;

  try {
    const event = await prismadb.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return { error: "Event not found!" };
    }

    const userFavouritesExists = await prismadb.userFavourite.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (userFavouritesExists) {
      if (inFavourites) {
        userFavourites = await prismadb.userFavourite.update({
          where: {
            clerkId: userId,
          },
          data: {
            favouriteEventsIds: userFavouritesExists.favouriteEventsIds.filter(
              (id) => id !== eventId
            ),
          },
        });
      } else {
        userFavourites = await prismadb.userFavourite.update({
          where: {
            clerkId: userId,
          },
          data: {
            favouriteEventsIds: [
              eventId,
              ...userFavouritesExists.favouriteEventsIds,
            ],
          },
        });
      }
    } else {
      userFavourites = await prismadb.userFavourite.create({
        data: {
          clerkId: userId,
          favouriteEventsIds: [eventId],
        },
      });
    }
  } catch (err) {
    return { error: "Failed to perform action." };
  }

  revalidatePath("/");

  return { data: userFavourites };
};

export const toggleFavourite = createSafeAction(ToggleFavourite, handler);
