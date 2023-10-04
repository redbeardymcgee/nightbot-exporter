import React from "react"
import Button from "@mui/material/Button"

import { Headers, NightbotExportButtonProps } from "../../types/types"

async function fetchPage(url: URL, options: Headers) {
  const page = await fetch(url, options)
  return await page.json()
}

async function fetchResource(
  acc: object[],
  url: URL,
  key: string,
  options: Headers
): Promise<any> {
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
  accessToken,
  endpoints,
}: NightbotExportButtonProps) {
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
            Authorization: `Bearer ${accessToken}`,
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
