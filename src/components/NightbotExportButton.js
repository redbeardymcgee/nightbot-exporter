import React from "react"
import Button from "@mui/material/Button"

const PATHS = {
  user: { paged: false, name: "user", path: "me" },
  channel: { paged: false, name: "channel", path: "channel" },
  custom_commands: { paged: false, name: "commands", path: "commands" },
  default_commands: {
    paged: false,
    name: "commands_default",
    path: "commands",
  },
  song_request_settings: {
    paged: false,
    name: "song_requests_settings",
    path: "song_requests",
  },
  song_queue: {
    paged: false,
    name: "song_requests_queue",
    path: "song_requests/queue",
  },
  spam_filters: { paged: false, name: "spam_filters", path: "spam_protection" },
  timers: { paged: false, name: "timers", path: "timers" },
  playlist: { paged: true, name: "playlist", path: "song_requests/playlist" },
  regulars: { paged: true, name: "regulars", path: "regulars" },
  subscribers: { paged: true, name: "subscribers", path: "subscribers" },
}

const fetchPage = async (url, token) => {
  const page = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await page.json()
}

async function paginate(acc, url, token, params) {
  const page = await fetchPage(url, token)
  const arr = acc.concat(page[resource.name])

  if (arr.length >= page._total) {
    console.log(arr)
    return arr
  }

  // TODO: inside the constructor, `offset` concats as string
  // idk why it parses funny in there
  // this workaround guarantees that my offset is a number, not "0100100100..."
  const limit = params.get("limit")
  const offset = parseInt(params.get("offset")) + parseInt(limit)
  return await paginate(
    arr,
    resource,
    token,
    new URLSearchParams({
      limit,
      offset,
    })
  )
}

export function NightbotExportButton({ accessToken, endpoints }) {
  const handleExport = async () => {
    Object.entries(endpoints)
      .filter((endpoint) => endpoint[1])
      .map(async ([key, value]) => {
        const url = `https://api.nightbot.tv/1/${PATHS[key].path}`

        if (!value.paged) {
          const payload = await fetchPage(url, accessToken)
          console.log(payload)
          return payload
        }

        return await paginate(
          [],
          url,
          accessToken,
          new URLSearchParams({
            limit: 100,
            offset: 0,
          })
        )
      })
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}
