import React from "react"
import Button from "@mui/material/Button"

const fetchPage = async (url, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const page = await fetch(url, options)
  return await page.json()
}

async function fetchResource(acc, url, key, token) {
  try {
    const page = await fetchPage(url, token)
    const total = page._total ? page._total : 0

    if (!total) return page

    const arr = acc.concat(page[key])

    if (arr.length >= total) {
      return arr
    }

    const params = url.searchParams
    const offset =
      parseInt(params.get("offset")) + parseInt(params.get("limit"))
    url.searchParams.set("offset", offset)

    const resource = await fetchResource(arr, url, key, token)
    return resource
  } catch (err) {
    console.log(err)
  }
}

export function NightbotExportButton({ accessToken, endpoints }) {
  const handleExport = async () => {
    Object.values(endpoints)
      .filter((endpoint) => endpoint.checked)
      .map(async (endpoint) => {
        const path = endpoint.path.slice(1)
        const url = new URL(`https://api.nightbot.tv/1/${path}`)
        url.searchParams.set("limit", 100)
        url.searchParams.set("offset", 0)

        const payload = await fetchResource([], url, endpoint.key, accessToken)

        console.log("payload: ", payload)
        return payload
      })
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}
