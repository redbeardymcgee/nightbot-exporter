import React from "react"
import { Button } from "@mui/material"

import { FetchOptions, NightbotExportButtonProps } from "../../types"

async function fetchPage(url: URL, options: FetchOptions) {
  const page = await fetch(url, options)
  return await page.json()
}

async function fetchResource<T>(
  acc: T[],
  url: URL,
  key: string,
  options: FetchOptions
): Promise<T[]> {
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

  const currentOffset = Number(url.searchParams.get("offset") || 0)
  const limit = Number(url.searchParams.get("limit") || 0)
  const newOffset = currentOffset + limit
  url.searchParams.set("offset", newOffset.toString())

  return await fetchResource(acc, url, key, options)
}

export function NightbotExportButton({
  token,
  endpoints,
}: NightbotExportButtonProps): React.JSX.Element {
  async function handleExport() {
    Object.values(endpoints)
      .filter((endpoint) => endpoint.checked)
      .map(async (endpoint) => {
        const path = endpoint.path
        const params = new URLSearchParams({ offset: "0", limit: "100" })
        const url = new URL(
          `https://api.nightbot.tv/1${path}?${params.toString()}`
        )
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const payload = await fetchResource([], url, endpoint.key, options)

        console.log(`payload: ${path} == `, payload)
        return payload
      })
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}