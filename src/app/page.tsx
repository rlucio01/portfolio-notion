import { getProjects } from "@/lib/notion";
import Portfolio from "@/components/Portfolio";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  return <Portfolio projects={projects} />;
}
