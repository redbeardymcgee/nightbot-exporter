import React from "react"
import Button from "@mui/material/Button"

async function paginate(acc, params, accessToken) {
  const page = await fetch(
    `https://api.nightbot.tv/1${path}?${params.toString()}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const payload = await page.json()
  const arr = acc.push(payload.data)

  if (arr.length >= payload.data._total) return arr

  return await paginate(
    arr,
    new URLSearchParams({ ...params, offset: params.offset + params.limit })
  )
}

export function NightbotExportButton({ accessToken, endpoints }) {
  const handleExport = async () => {
    Object.values(endpoints)
      .filter((endpoint) => endpoint.checked)
      .map(async (p) => {
        const path = p.path.replace(/^\//, "")

        if (p === "playlist" || p === "subscribers") {
          return await paginate(
            [],
            new URLSearchParams({
              limit: 100,
              offset: 0,
            }),
            accessToken
          )
        }

        const res = await fetch(`https://api.nightbot.tv/1/${path}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const foo = await res.json()
        return foo.data
      })
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}
