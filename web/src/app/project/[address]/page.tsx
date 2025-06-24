// import ProjectDetails from "@/components/project/ProjectDetails";
import { Address } from "viem";

type ProjectProps = Promise<{
  params: {
    address: string;
  };
}>;

export default async function Project({ params }: Awaited<ProjectProps>) {

  const projectAddress = await params.address as Address;

  return (
    <section className="mx-2 md:mx-8 mt-8">
      <div>{projectAddress}</div>
      

    </section>
  );
}
