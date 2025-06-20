import ProjectList from "@/components/projectlist/ProjectList";

export default function Project({ params }: { params: { address: string } }) {
    
  return (
    <section className="mx-2 md:mx-8 mt-8">
        <div>{params.address}</div>
      <ProjectList/>
    </section>
  );
}
