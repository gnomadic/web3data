// import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectList from "@/components/projectlist/ProjectList";
import { Address } from "viem";

export default async function Project({ params }: { params: { address: string } }) {


  const projectAddress = await params.address as Address;

  return (
    <section className="mx-2 md:mx-8 mt-8">
      <div>{projectAddress}</div>
      {/* <ProjectList/> */}
      {/* <ProjectDetails projectAddress={projectAddress} /> */}

    </section>
  );
}
