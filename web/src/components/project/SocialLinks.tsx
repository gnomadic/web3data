"use client";

import React from 'react';
import { Github, Twitter, Globe, MessageSquare } from 'lucide-react';
import { DAOIP5ProjectSocial } from '@/lib/types/daoipTypes';

type SocialLink = {
  key: "github" | "twitter" | "website" | "discord" | "farcaster";
  url?: string;
  name: string;
  icon: React.ReactNode;
};

// TODO update social icons
export const SocialLinks = ({ socials }: { socials: DAOIP5ProjectSocial[] | undefined }) => {
  const socialLinks: SocialLink[] = [
    { key: 'github', url: socials?.find(s => s.value === 'github')?.value, name: 'GitHub', icon: <Github className="size-4" /> },
    { key: 'twitter', url: socials?.find(s => s.value === 'twitter')?.value, name: 'Twitter', icon: <Twitter className="size-4" /> },
    { key: 'website', url: socials?.find(s => s.value === 'website')?.value, name: 'Website', icon: <Globe className="size-4" /> },
    { key: 'discord', url: socials?.find(s => s.value === 'discord')?.value, name: 'Discord', icon: <MessageSquare className="size-4" /> },
    { key: 'farcaster', url: socials?.find(s => s.value === 'farcaster')?.value, name: 'Farcaster', icon: null },
  ];

  const availableLinks = socialLinks.filter(link => link.url);

  if (availableLinks.length === 0) {
    return (
        <div>
            <p className="text-sm text-muted-foreground pt-2">No social links added yet.</p>
        </div>
    );
  }

  return (
    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 pt-2">
      {availableLinks.map(link => (
        <a
          key={link.key}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label={link.name}
        >
          {link.icon}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
};