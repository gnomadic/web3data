"use client";
import CreateButton from "@/components/CreateButton";
import ProjectList from "@/components/projectlist/ProjectList";
import { useAccount } from "wagmi";

export default function Home() {

      const { address } = useAccount();
  

  return (
    <section className="mx-2 md:mx-8 mt-8">
      <CreateButton owner={address ?? "0x0"} />
      <ProjectList/>
    </section>
  );
}
