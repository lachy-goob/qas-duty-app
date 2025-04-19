import { pgTable, text, timestamp, serial, integer } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: serial("user_id").primaryKey().notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
});

export const Job = pgTable("job", {
  id: serial("job_id").primaryKey().notNull(),
  user_id: integer("user_id").references(() => User.id),
  shiftType: text("shift").notNull(),
  dispatchTime: timestamp("dispatch_time").defaultNow().notNull(),
  clearTime: timestamp("clear_time").defaultNow().notNull(),
  composition: text("composition").notNull(),
  type: text("type").notNull(),
  response: text("response").notNull(),
});
