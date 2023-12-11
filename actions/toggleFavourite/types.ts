import { z } from "zod";
import { ToggleFavourite } from "./schema";
import { UserFavourite } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof ToggleFavourite>;

export type ReturnType = ActionState<InputType, UserFavourite>;
