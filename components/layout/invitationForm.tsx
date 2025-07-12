"use client";
import React from "react";
// import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { IndividualGuestProps } from "@/lib/types";

function InvitationForm({ guest }: { guest: IndividualGuestProps }) {
  return (
    <div className="min-h-screen flex justify-center px-4">
      <form className="py-6 w-full max-w-lg space-y-6">
        {/* later use form action */}
        <div className="text-center space-y-3">
          <Label className="text-lg font-semibold block">
            Will you be attending?
          </Label>
          <RadioGroup name="attending" className="flex gap-6 justify-center">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accept" id="accept" />
              <Label htmlFor="accept">Accept</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="decline" id="decline" />
              <Label htmlFor="decline">Decline</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="text-center space-y-3">
          <div className="space-y-1">
            <Label htmlFor="guestCount" className="text-lg font-semibold block">
              How many guests inclusive of you will be attending?
            </Label>
            <p className="text-sm text-gray-600">
              Maximum {guest.attendees_count} guests allowed
            </p>
          </div>
          <Input
            id="guestCount"
            name="guestCount"
            type="number"
            min="0"
            max={guest.attendees_count}
            placeholder="0"
            className="max-w-[80px] mx-auto text-center"
          />
        </div>

        <div className="text-center space-y-3">
          <Label className="text-lg font-semibold block">
            Dietary Restrictions
          </Label>
          <RadioGroup
            name="dietaryRestriction"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            <div className="flex items-center justify-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">No dietary restrictions</Label>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RadioGroupItem value="vegetarian" id="vegetarian" />
              <Label htmlFor="vegetarian">Vegetarian</Label>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RadioGroupItem value="vegan" id="vegan" />
              <Label htmlFor="vegan">Vegan</Label>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RadioGroupItem value="gluten-free" id="gluten-free" />
              <Label htmlFor="gluten-free">Gluten-Free</Label>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RadioGroupItem value="halal" id="halal" />
              <Label htmlFor="halal">Halal</Label>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        {guest.guestGroup !== null && guest.attendees.length > 0 && (
          <div className="text-center space-y-3">
            <Label className="text-lg font-semibold block">
              Other guests that are attending
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
              {guest.attendees.map((guestName, index) => (
                <div
                  key={index}
                  className="p-2 border-1 border-black-50 text-center"
                >
                  {guestName}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  return (
    <Button type="submit" disabled={true} className="w-full max-w-xs">
      Submit
    </Button>
  );
}

export default InvitationForm;
