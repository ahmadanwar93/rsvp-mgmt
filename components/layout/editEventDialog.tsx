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
import React, { useEffect, useState, useTransition } from "react";
import { Calendar24 } from "./dateTimePicker";
import { DialogEventProps } from "@/lib/types";
import { createEvent } from "@/actions/events";
import { toast } from "sonner";

export function EditEventDialog({
  button,
  title,
  description,
  data,
}: DialogEventProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState(data.title);
  const [formLocation, setFormLocation] = useState(data.location);

  const startDateTime = new Date(data.startDateTime);
  const endDateTime = new Date(data.endDateTime);
  const rsvpDeadline = new Date(data.rsvpDeadline);

  // TODO: recheck if needed to put in a separate function
  const parsedData = {
    title: data.title,
    location: data.location,
    startDate: startDateTime,
    startTime: startDateTime.toLocaleTimeString(),
    endDate: endDateTime,
    endTime: endDateTime.toLocaleTimeString(),
    rsvpDeadlineDate: rsvpDeadline,
    rsvpDeadlineTime: rsvpDeadline.toLocaleTimeString(),
  };

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

  // this is to ensure the form values are reset when the dialog is closed
  useEffect(() => {
    setFormTitle(data.title);
    setFormLocation(data.location);
  }, [data.title, data.location, open]);

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
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Calendar24
                dateLabel="Start date"
                timeLabel="Start time"
                dateName="startDate"
                timeName="startTime"
                defaultDate={parsedData.startDate}
                defaultTime={parsedData.startTime}
              />
            </div>
            <div className="grid gap-3">
              <Calendar24
                dateLabel="End date"
                timeLabel="End time"
                dateName="endDate"
                timeName="endTime"
                defaultDate={parsedData.endDate}
                defaultTime={parsedData.endTime}
              />
            </div>
            <div className="grid gap-3">
              <Calendar24
                dateLabel="RSVP deadline"
                timeLabel="RSVP deadline"
                dateName="rsvpDeadlineDate"
                timeName="rsvpDeadlineTime"
                defaultDate={parsedData.rsvpDeadlineDate}
                defaultTime={parsedData.rsvpDeadlineTime}
              />
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
