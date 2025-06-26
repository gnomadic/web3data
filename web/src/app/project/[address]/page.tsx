import ProjectDetails from "@/components/project/ProjectDetails";
import { use } from "react";
import { Address } from "viem";


type Params = Promise<{ address: string }>

export default function Project(props: {
  params: Params
  
}) {

  
    const params = use(props.params)

    const projectAddress = params.address as Address;


  return (
    <section className="mx-2 md:mx-8 mt-8">
      {/* <div>{projectAddress}</div> */}
      <ProjectDetails projectAddress={projectAddress} />


    </section>
  );
}
