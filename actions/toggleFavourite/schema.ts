import { z } from "zod";

export const ToggleFavourite = z.object({
  eventId: z.string(),
  inFavourites: z.boolean(),
});
