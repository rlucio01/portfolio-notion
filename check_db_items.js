/* eslint-disable */
const token = 'ntn_Bxj71591498zCOuzbSOQ0ZZAzlVJ5CpPpUVOlt3i57650K';
const databaseId = '26000444-664a-80a4-a7e7-eb1302663b77';

async function listItems() {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });

    if (!res.ok) {
        console.error('Failed to fetch:', res.status, res.statusText);
        const text = await res.text();
        console.error(text);
        return;
    }

    const data = await res.json();
    console.log('Found items:', data.results.length);
    data.results.forEach(page => {
        console.log(`- Page ID: ${page.id}`);
        const props = page.properties;
        console.log('  Props:', Object.keys(props));
        // Log Values
        try {
            const name = props.Nome?.title?.[0]?.plain_text;
            console.log('  Name:', name);
        } catch (e) { console.log('  Name: Error/Empty'); }
    });
}

listItems().catch(e => console.error(e));

