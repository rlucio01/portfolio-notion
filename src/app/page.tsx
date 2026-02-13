import { getProjects } from "@/lib/notion";
import Portfolio from "@/components/Portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();
  return <Portfolio projects={projects} />;
}
