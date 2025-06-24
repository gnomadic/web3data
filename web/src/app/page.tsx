import CreateButton from "@/components/CreateButton";
import ProjectList from "@/components/projectlist/ProjectList";

export default function Home() {

  return (
    <section className="mx-2 md:mx-8 mt-8">
      <CreateButton  />
      <ProjectList />
    </section>
  );
}
