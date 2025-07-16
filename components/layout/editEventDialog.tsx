"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useTransition } from "react";
import { Calendar24 } from "./dateTimePicker";
import { DialogEventProps } from "@/lib/types";
import { createEvent } from "@/actions/events";
import { toast } from "sonner";
import { Calendar22 } from "./datePicker";

export function EditEventDialog({
  button,
  title,
  description,
  data,
}: DialogEventProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string | null>(null);

  console.log(data);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setErrors(null);

      const result = await createEvent(formData);

      if (result.success) {
        toast.success("Event created successfully!");
        setOpen(false);
        // Reset form by closing and reopening dialog
      } else {
        setErrors(result.error!);
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {errors && (
            <div className="bg-destructive/15 border border-destructive/20 rounded-md p-3 mb-4">
              <p className="text-sm text-destructive">{errors}</p>
            </div>
          )}

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder={data.title}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder={data.location}
                required
              />
            </div>
            <div className="grid gap-3">
              <Calendar24
                dateLabel="Start date"
                timeLabel="Start time"
                dateName="startDate"
                timeName="startTime"
              />
            </div>
            <div className="grid gap-3">
              <Calendar24
                dateLabel="End date"
                timeLabel="End time"
                dateName="endDate"
                timeName="endTime"
              />
            </div>
            <div className="grid gap-3">
              <Calendar22 dateLabel="RSVP deadline" dateName="rsvpDeadline" />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
