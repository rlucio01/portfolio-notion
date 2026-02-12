/* eslint-disable */
const token = 'ntn_Bxj71591498zCOuzbSOQ0ZZAzlVJ5CpPpUVOlt3i57650K';
const databaseId = '26000444-664a-80a4-a7e7-eb1302663b77';

async function verifyImages() {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_size: 100 }), // limit to 100
    });

    if (!res.ok) {
        console.error('Failed:', res.status);
        return;
    }

    const data = await res.json();
    console.log(`Checking ${data.results.length} items...`);

    data.results.forEach((page, i) => {
        const props = page.properties;
        const name = props.Nome?.title?.[0]?.plain_text || 'Untitled';
        console.log(`\n[${i}] ${name}`);

        // Check Arquivos e mídia
        const arquivos = props["Arquivos e mídia"];
        console.log('  Arquivos e mídia:', JSON.stringify(arquivos, null, 2));

        // Check Cover
        console.log('  Cover:', JSON.stringify(page.cover, null, 2));
    });
}

verifyImages().catch(console.error);
