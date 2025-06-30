import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/90 backdrop-blur border-b border-border shadow-sm">
      <div className="flex items-center justify-between py-4 px-2 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-primary font-title">
            web3data
            <span className="hidden md:inline">
              .website
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ConnectButton
            chainStatus='icon'
            accountStatus='avatar'
            showBalance={false}
          />
        </div>
      </div>
    </header>
  );
}
