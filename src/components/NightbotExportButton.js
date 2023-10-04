import React from "react"
import Button from "@mui/material/Button"

const fetchPage = async (url, options) => {
  const page = await fetch(url, options)
  return await page.json()
}

async function fetchResource(acc, url, key, options) {
  const page = await fetchPage(url, options)
  const total = page._total ? page._total : 0

  try {
    acc.push(...page[key])
  } catch {
    acc.push(page[key])
  }

  if (acc.length >= total) {
    return acc
  }

  url.searchParams.set(
    "offset",
    parseInt(url.searchParams.get("offset")) +
      parseInt(url.searchParams.get("limit"))
  )

  return await fetchResource(acc, url, key, options)
}

export function NightbotExportButton({ accessToken, endpoints }) {
  const handleExport = async () => {
    Object.values(endpoints)
      .filter((endpoint) => endpoint.checked)
      .map(async (endpoint) => {
        const path = endpoint.path
        const params = new URLSearchParams({ offset: 0, limit: 100 })
        const url = new URL(
          `https://api.nightbot.tv/1${path}?${params.toString()}`
        )
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        const payload = await fetchResource([], url, endpoint.key, options)

        console.log(`payload: ${path} == ${payload}`)
        return payload
      })
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}
