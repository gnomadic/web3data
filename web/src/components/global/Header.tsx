import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

type Props = {
//   projects: ProjectProfile[];
//   onCreateProject: () => void;
//   activeProjectId: string | null;
//   setActiveProjectId: (id: string) => void;
};

export function Header({
//   projects,
//   onCreateProject,
//   activeProjectId,
//   setActiveProjectId,
}: Props) {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/90 backdrop-blur border-b border-border shadow-sm">
      <div className="flex items-center justify-between py-4 px-8 max-w-7xl mx-auto">
        {/* App logo/title */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-primary font-title">
            web3data.website
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}