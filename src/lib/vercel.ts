export async function setEdgeConfig(flags: any) {
  const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID
  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN

  const response = await fetch(
    `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: Object.entries(flags).map(([key, value]) => ({
          operation: 'upsert',
          key,
          value,
        })),
      }),
    }
  )

  if (!response.ok) {
    console.error('Failed to update Edge Config', await response.text())
  }
}
