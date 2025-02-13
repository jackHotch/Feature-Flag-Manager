export async function setEdgeConfig(flags: any) {
  const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID
  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN

  try {
    const updateEdgeConfig = await fetch(
      `https://api.vercel.com/v1/edge-config/ecfg_u8fxaj5nnwcp2zufhnew5fx8bkfs/items`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'create',
              key: 'example_key_1',
              value: 'example_value_1',
            },
            {
              operation: 'create',
              key: 'example_key_2',
              value: 'new_value',
            },
          ],
        }),
      }
    )
    const result = await updateEdgeConfig.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
