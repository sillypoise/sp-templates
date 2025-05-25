import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { users } from "@db/schema.ts";

// Preferred method using InferSelectModel and InferInsertModel
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
