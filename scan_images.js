/* eslint-disable */
const token = 'ntn_Bxj71591498zCOuzbSOQ0ZZAzlVJ5CpPpUVOlt3i57650K';
const databaseId = '26000444-664a-80a4-a7e7-eb1302663b77';

async function scanForImages() {
    console.log("Scanning for images...");
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_size: 100 }),
    });

    if (!res.ok) {
        console.error('Failed:', res.status);
        return;
    }

    const data = await res.json();
    let found = false;

    data.results.forEach((page) => {
        const props = page.properties;
        const name = props.Nome?.title?.[0]?.plain_text || 'Untitled';
        const arquivos = props["Arquivos e mídia"];

        // Check if meaningful content
        const hasFiles = arquivos?.files?.length > 0;
        const hasCover = !!page.cover;
        const hasIcon = !!page.icon;

        if (hasFiles || hasCover || hasIcon) {
            found = true;
            console.log(`\nFound content in: ${name}`);
            if (hasFiles) console.log(' - Files:', JSON.stringify(arquivos.files, null, 2));
            if (hasCover) console.log(' - Cover:', JSON.stringify(page.cover, null, 2));
            if (hasIcon) console.log(' - Icon:', JSON.stringify(page.icon, null, 2));
        }
    });

    if (!found) {
        console.log("\nNo images (Files, Cover, or Icon) found in any of the checked pages.");
    }
}

scanForImages().catch(console.error);
