"use client";

import { useMemo } from "react";
import { match, P } from "ts-pattern";
import { Avatar as ShadCNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  fallbackName?: string;
  ipfsCID?: string;
  url?: string;
  ipfsBaseURL?: string;
  defaultImage?: string;
  noPadding?: boolean; // New prop to optionally remove padding
  className?: string; // New prop to allow custom class names
}

// const avatarVariants = tv({
//   variants: {
//     variant: {
//       default: "shadow-slate-600 bg-white shadow-md",
//       bordered: "border-1 border-white bg-white",
//     },
//   },
//   defaultVariants: {
//     variant: "default",
//   },
// });

export const Avatar = ({
  fallbackName,
  ipfsCID,
  url,
  ipfsBaseURL = "https://ipfs.io/ipfs/",
  defaultImage,// = "/api/svg?title=Example+Preview",
  className = "w-18 md:w-24",
}: AvatarProps) => {
  const imageURL = useMemo(() => {
    return match({ ipfsCID, url })
      .with(
        { ipfsCID: P.when((cid) => !cid || typeof cid !== "string"), url: P.nullish },
        () => defaultImage,
      )
      .with({ ipfsCID: P.when((cid) => !cid || typeof cid !== "string"), url }, ({ url }) => url)
      .with(
        { ipfsCID: P.when((cid) => typeof cid === "string" && cid.length > 0), url: P.nullish },
        ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`,
      )
      .with(
        { ipfsCID: P.string.minLength(1), url: P.string.minLength(1) },
        ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`,
      )
      .otherwise(() => defaultImage);
  }, [ipfsCID, url, ipfsBaseURL]);

  const fallback = useMemo(() => {
    return match(fallbackName)
      .with(undefined, () => "")
      .otherwise((name) => {
        const words = name.trim().split(/\s+/);
        return match(words)
          .with([P.string], ([word]) =>
            word.length === 1 ? word.toUpperCase() : word.slice(0, 2).toUpperCase(),
          )
          .otherwise(([first, second]) => (first[0] + (second?.[0] || "")).toUpperCase());
      });
  }, [fallbackName]);

//   const avatarClassNames = avatarVariants({ variant });

  return (
    <ShadCNAvatar
      role="presentation"
      className={cn("aspect-square h-full border-1 border-white bg-black ", className)}
    >
      <AvatarImage src={imageURL} alt="avatar" className="p-1" />
      <AvatarFallback
      className="md:text-4xl text-xl font-text bg-black"
      >{fallback}</AvatarFallback>
    </ShadCNAvatar>
  );
};