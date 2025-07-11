import { example } from "@/lib/const";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  // replace this with server actions later
  const eventDetail = example.filter((event) => event.id === id);

  console.log(eventDetail);
  return <div>page</div>;
}

export default Page;
