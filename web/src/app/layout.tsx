import type { Metadata } from "next";
import { M_PLUS_1_Code, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/global/Header";
import { Providers } from "@/components/global/Providers";
import { Analytics } from "@vercel/analytics/next";
import '@rainbow-me/rainbowkit/styles.css';

const mOne = M_PLUS_1_Code({
  variable: "--font-m-plus-1",
  subsets: ["latin"],
  weight: "400",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "web3data.website",
  description: "This website has all the data you need for your web3 project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mOne.variable} ${sourceCode.variable} antialiased justify-center`}
      >
        <Providers>

          <Header />
          {children}

          {/* <ToastContainer position='bottom-right' /> */}


          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
