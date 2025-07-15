import { Navbar } from "@/components/layout/navbar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar isAuth={false} />
      {children}
    </div>
  );
}

export default layout;
