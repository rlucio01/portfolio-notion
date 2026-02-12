
export type Project = {
    id: string;
    name: string;
    description: string;
    url: string;
    tags: string[];
    image: string | null;
    slug: string;
};

export const getProjects = async (): Promise<Project[]> => {
    const token = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!token || !databaseId) throw new Error("Missing Notion env vars");

    try {
        console.log("Fetching Notion data...");
        const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sorts: [
                    {
                        timestamp: "created_time",
                        direction: "descending",
                    },
                ],
            }),
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Notion API Error:", res.status, text);
            return [];
        }

        const data = await res.json();
        console.log(`Fetched ${data.results.length} projects.`);

        return data.results.map((page: any) => {
            const props = page.properties;
            // Handle image extraction - prioritize cover
            let image = null;
            if (page.cover) {
                if (page.cover.type === 'external') {
                    image = page.cover.external.url;
                } else if (page.cover.type === 'file') {
                    image = page.cover.file.url;
                }
            }

            return {
                id: page.id,
                name: props.Nome?.title?.[0]?.plain_text || "Untitled Project",
                description: props.Texto?.rich_text?.[0]?.plain_text || "",
                url: props.URL?.url || "#",
                tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                image: image,
                slug: page.id,
            };
        });

    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};
