
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
                page_size: 100
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Notion API Error:", res.status);
            return [];
        }

        const data = await res.json();
        console.log(`DEBUG: Fetched ${data.results.length} projects`);

        return data.results.map((page: any) => {
            const props = page.properties;
            const name = props.Nome?.title?.[0]?.plain_text || "Untitled Project";

            // Handle image extraction - prioritize "Arquivos e mídia" field, then Cover
            let image = null;
            let debugSource = "none";

            // Check for "Arquivos e mídia"
            if (props["Arquivos e mídia"]?.files?.length > 0) {
                const file = props["Arquivos e mídia"].files[0];
                if (file.type === 'file') {
                    image = file.file.url;
                    debugSource = "file";
                } else if (file.type === 'external') {
                    image = file.external.url;
                    debugSource = "external";
                }
            }

            // Fallback to Cover if no file found
            if (!image && page.cover) {
                if (page.cover.type === 'external') {
                    image = page.cover.external.url;
                    debugSource = "cover-external";
                } else if (page.cover.type === 'file') {
                    image = page.cover.file.url;
                    debugSource = "cover-file";
                }
            }

            if (image) {
                // console.log(`DEBUG: Image found for ${name} (${debugSource})`);
            }

            return {
                id: page.id,
                name: name,
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
