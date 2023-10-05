import React, { useState, useEffect, ChangeEvent } from "react"
import { Container } from "@mui/material"
import { NightbotExportSelector } from "./components/NightbotExportSelector"
import { Endpoints } from "../types"

const ENDPOINTS: Endpoints = {
  user: { checked: false, resource_key: "user", path: "/me" },
  channel: { checked: false, resource_key: "channel", path: "/channel" },
  custom_commands: {
    checked: true,
    resource_key: "commands",
    path: "/commands",
  },
  spam_filters: {
    checked: false,
    resource_key: "filters",
    path: "/spam_protection",
  },
  timers: { checked: true, resource_key: "timers", path: "/timers" },
  playlist: {
    checked: false,
    resource_key: "playlist",
    path: "/song_requests/playlist",
  },
  regulars: { checked: false, resource_key: "regulars", path: "/regulars" },
  subscribers: {
    checked: false,
    resource_key: "subscribers",
    path: "/subscribers",
  },
  default_commands: {
    checked: true,
    resource_key: "commands",
    path: "/commands/default",
  },
  song_request_settings: {
    checked: false,
    resource_key: "settings",
    path: "/song_requests",
  },
  song_queue: {
    checked: false,
    resource_key: "queue",
    path: "/song_requests/queue",
  },
}

export default function App() {
  const [token, setToken] = useState("")
  const params = new URLSearchParams(window.location.hash.replace("#", "?"))

  useEffect(() => {
    if (params.get("access_token")) {
      setToken(params.get("access_token")!)
    }
  }, [params])

  const [endpoints, setEndpoints] = useState(ENDPOINTS)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEndpoints((endpoints) => {
      return {
        ...endpoints,
        [event.target.name]: {
          ...endpoints[event.target.name],
          checked: event.target.checked,
        },
      }
    })
  }

  return (
    <Container maxWidth="sm">
      <NightbotExportSelector
        endpoints={endpoints}
        token={token}
        handleChange={handleChange}
      />
    </Container>
  )
}
