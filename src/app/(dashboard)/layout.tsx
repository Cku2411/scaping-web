import DesktopSidebar from "@/components/desktop-sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen ">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          ScrapeFlow
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 px-6 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
