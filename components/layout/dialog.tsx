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
import React from "react";
import { Calendar24 } from "./dateTimePicker";
import { DialogEventProps } from "@/lib/types";

// TODO: react hook form?

export function DialogEvent({ button, title, description }: DialogEventProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{button}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Event title here" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" name="venue" placeholder="Event venue here" />
            </div>
            <div className="grid gap-3">
              <Calendar24 dateLabel="start date" timeLabel="start time" />
            </div>
            <div className="grid gap-3">
              <Calendar24 dateLabel="end date" timeLabel="end time" />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
