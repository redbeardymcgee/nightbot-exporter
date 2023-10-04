import React, { useState, useEffect, ChangeEvent } from "react"

import { Container } from "@mui/material"
import { Typography } from "@mui/material"
import { Box } from "@mui/material"

import { Endpoints } from "../types/types"

import { NightbotAuthButton } from "./components/NightbotAuthButton"
import { NightbotExportButton } from "./components/NightbotExportButton"
import { NightbotExportSelector } from "./components/NightbotExportSelector"

const ENDPOINTS: Endpoints = {
  user: { checked: false, key: "user", path: "/me" },
  channel: { checked: false, key: "channel", path: "/channel" },
  custom_commands: { checked: true, key: "commands", path: "/commands" },
  spam_filters: { checked: false, key: "filters", path: "/spam_protection" },
  timers: { checked: true, key: "timers", path: "/timers" },
  playlist: {
    checked: false,
    key: "playlist",
    path: "/song_requests/playlist",
  },
  regulars: { checked: false, key: "regulars", path: "/regulars" },
  subscribers: { checked: false, key: "subscribers", path: "/subscribers" },
  default_commands: {
    checked: true,
    key: "commands",
    path: "/commands/default",
  },
  song_request_settings: {
    checked: false,
    key: "settings",
    path: "/song_requests",
  },
  song_queue: { checked: false, key: "queue", path: "/song_requests/queue" },
}

export default function App() {
  const [accessToken, setAccessToken] = useState("")
  const params = new URLSearchParams(window.location.hash.replace("#", "?"))

  useEffect(() => {
    if (params.get("access_token")) {
      setAccessToken(params.get("access_token") as string)
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
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {accessToken ? (
            <>
              <NightbotExportSelector
                endpoints={endpoints}
                handleChange={handleChange}
              />
              <NightbotExportButton
                accessToken={accessToken}
                endpoints={endpoints}
              />
            </>
          ) : (
            <NightbotAuthButton />
          )}
        </Typography>
      </Box>
    </Container>
  )
}
