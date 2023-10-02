import React from "react"
import Button from "@mui/material/Button"

const paths = {
  user: "/me",
  channel: "/channel",
  custom_commands: "/commands",
  default_commands: "/commands/default",
  regulars: "/regulars",
  playlist: "/song_requests/playlist",
  song_request_settings: "/song_requests",
  song_queue: "/song_requests/queue",
  spam_filters: "/spam_protection",
  subscribers: "/subscribers",
  timers: "/timers",
}

async function paginate(acc, path, params, accessToken) {
  const page = await fetch(
    `https://api.nightbot.tv/1${path}?${params.toString()}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const payload = await page.json()
  const arr = acc.push(payload.data)

  if (arr.length >= payload.data._total) return arr

  return await paginate(
    arr,
    path,
    new URLSearchParams({ ...params, offset: params.offset + params.limit })
  )
}

export function NightbotExportButton({ accessToken, endpoints }) {
  const handleExport = async () => {
    Object.entries(endpoints)
      .filter((endpoint) => endpoint[1])
      .map(async (endpoint) => {
        const path = paths[endpoint[0]]

        if (path === "playlist" || path === "subscribers") {
          return await paginate(
            [],
            path,
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
        return await res.json()
      })
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}
