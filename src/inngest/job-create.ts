import { inngest } from "@/inngest/client";
import { db } from "@/app/db";
import { Job } from "@/app/db/schema";

export const createJob = inngest.createFunction(
  { id: "create-job" },
  { event: "job/create" },
  async ({ event }) => {
    const {
      user_id,
      shiftType,
      dispatchTime,
      clearTime,
      composition,
      type,
      response,
    } = event.data;

    const dispatch = new Date(dispatchTime);
    const clear = new Date(clearTime);

    if (dispatch > clear) {
      throw new Error("Dispatch time cannot be after clear time!");
    }

    try {
      await db.insert(Job).values({
        user_id,
        shiftType,
        dispatchTime: new Date(dispatchTime),
        clearTime: new Date(clearTime),
        composition,
        type,
        response,
      });

      return { success: true };
    } catch (err) {
      console.error("Error inserting job:", err);
      throw new Error("Failed to insert job into the database.");
    }
  }
);
