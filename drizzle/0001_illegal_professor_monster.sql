CREATE TYPE "public"."dietary_restrictions" AS ENUM('vegetarian', 'vegan', 'halal', 'gluten_free');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('draft', 'active', 'elapsed');--> statement-breakpoint
CREATE TYPE "public"."respond_status" AS ENUM('pending', 'attending', 'declined');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"event_start_datetime" timestamp NOT NULL,
	"event_end_datetime" timestamp NOT NULL,
	"location" text NOT NULL,
	"rsvp_deadline" timestamp NOT NULL,
	"status" "event_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guest_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	"name" text NOT NULL,
	"respond_status" "respond_status" DEFAULT 'pending' NOT NULL,
	"guest_limit" integer,
	"attending_count" integer,
	"dietary_restrictions" "dietary_restrictions",
	"responded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_groups" ADD CONSTRAINT "guest_groups_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_group_id_guest_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."guest_groups"("id") ON DELETE cascade ON UPDATE no action;