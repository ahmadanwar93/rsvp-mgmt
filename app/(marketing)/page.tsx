import CalendarIcon from "@/components/icons/CalendarIcon";
import TickIcon from "@/components/icons/TickIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container-custom">
      <section className="relative h-[500px] overflow-hidden rounded-lg flex flex-col justify-center items-center">
        <Image
          src="/hero-cover.jpg"
          alt="Wedding venue"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col justify-center items-center gap-2 p-6 max-w-xl">
          <h1 className="text-white text-4xl font-bold text-center">
            Effortlessly manage your wedding list
          </h1>
          <p className="text-white text-lg text-center">
            Simplify your wedding planning with our intuitive guest tracking
            platform. Keep track of RSVPs, meal preferences, and more, all in
            one place.
          </p>
          <div className="flex gap-4 mt-6">
            <Button className="bg-blue-600 text-white rounded-full">
              Get started
            </Button>
            <Button variant="outline" className="rounded-full">
              Learn more
            </Button>
          </div>
        </div>
      </section>
      <section className=" py-10 flex flex-col gap-10">
        <div>
          <h2 className="font-extrabold text-4xl mb-4 text-center">
            Key Features
          </h2>
          <p className="text-base text-center">
            Our platform offers a range of features designed to streamline your
            wedding planning process.
          </p>
        </div>
        <div className="flex gap-3">
          <Card className="max-w-[300px]">
            <CardHeader>
              <UsersIcon />
              <CardTitle className="mt-2">Guest Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Easily import and organize your guest list, including contact
                information and relationships.
              </p>
            </CardContent>
          </Card>
          <Card className="max-w-[300px]">
            <CardHeader>
              <CalendarIcon />
              <CardTitle className="mt-2">RSVP Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Send invitations and track RSVPs in real-time, with automated
                reminders for guests.
              </p>
            </CardContent>
          </Card>
          <Card className="max-w-[300px]">
            <CardHeader>
              <TickIcon />
              <CardTitle className="mt-2">Invitation Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Stay informed with instant updates on guest responses, dietary
                restrictions, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="">
        <h2 className="font-extrabold text-4xl mb-4 text-center">
          Ready to simplify your wedding planning?
        </h2>
        <p className="text-base text-center">
          Join us to manage their wedding guest lists with ease.
        </p>
        <div className="flex justify-center mt-8">
          <Button className="bg-blue-600 text-white rounded-full">
            Sign up now
          </Button>
        </div>
      </section>
    </main>
  );
}
