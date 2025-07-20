import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "active",
  "elapsed",
]);
export const respondStatusEnum = pgEnum("respond_status", [
  "pending",
  "attending",
  "declined",
]);
export const dietaryRestrictionsEnum = pgEnum("dietary_restrictions", [
  "vegetarian",
  "vegan",
  "halal",
  "gluten_free",
]);

//
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

// trying to follow convention of snake_case for column name, camelCase for object property
// also implementing hard delete
export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  eventStartDatetime: timestamp("event_start_datetime", {
    mode: "date",
  }).notNull(),
  // mode date will return date object, mode string will return ISO string
  eventEndDatetime: timestamp("event_end_datetime", { mode: "date" }).notNull(),
  location: text("location").notNull(),
  rsvpDeadline: timestamp("rsvp_deadline", { mode: "date" }).notNull(),
  status: eventStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const guestGroups = pgTable("guest_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const guests = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  groupId: uuid("group_id")
    .notNull()
    .references(() => guestGroups.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  respondStatus: respondStatusEnum("respond_status")
    .notNull()
    .default("pending"),
  guestLimit: integer("guest_limit"),
  attendingCount: integer("attending_count"),
  dietaryRestrictions: dietaryRestrictionsEnum("dietary_restrictions"),
  respondedAt: timestamp("responded_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Will be used for insert and select queries
export type SelectEvent = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type SelectGuest = typeof guests.$inferSelect;
export type InsertGuest = typeof guests.$inferInsert;
export type SelectGroup = typeof guestGroups.$inferSelect;
export type InsertGroup = typeof guestGroups.$inferInsert;

// for relations. If db.query is being used, then it will behave ORM-like, so must use with relations
// If db.select is being used, then it will behave like SQL, so just use joins
export const guestsRelations = relations(guests, ({ one }) => ({
  guestGroup: one(guestGroups, {
    fields: [guests.groupId],
    references: [guestGroups.id],
  }),
  event: one(events, {
    fields: [guests.eventId],
    references: [events.id],
  }),
}));

export const guestGroupsRelations = relations(guestGroups, ({ many, one }) => ({
  guests: many(guests),
  event: one(events, {
    fields: [guestGroups.eventId],
    references: [events.id],
  }),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  guests: many(guests),
  guestGroups: many(guestGroups),
}));
