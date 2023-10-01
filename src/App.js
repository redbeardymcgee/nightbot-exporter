import React, { useState, useEffect } from "react"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
// import Link from "@mui/material/Link"
import { NightbotAuthButton } from "./components/NightbotAuthButton"
import { NightbotExportButton } from "./components/NightbotExportButton"
import { NightbotExportSelector } from "./components/NightbotExportSelector"

export default function App() {
  const [accessToken, setAccessToken] = useState(null)
  const params = new URLSearchParams(window.location.hash.replace("#", ""))

  useEffect(() => {
    if (params.get("access_token")) {
      setAccessToken(params.get("access_token"))
    }
  }, [params])

  const handleChange = (event) => {
    setEndpointsState({
      ...endpoints,
      [event.target.name]: event.target.checked,
    })
  }

  const [endpoints, setEndpointsState] = useState({
    user: { checked: false, path: "/me" },
    channel: { checked: false, path: "/channel" },
    custom_commands: { checked: true, path: "/commands" },
    default_commands: { checked: false, path: "/commands/default" },
    regulars: { checked: true, path: "/regulars" },
    playlist: { checked: false, path: "/song_requests/playlist" },
    song_request_settings: { checked: false, path: "/song_requests" },
    song_queue: { checked: false, path: "/song_requests/queue" },
    spam_filters: { checked: false, path: "/spam_protection" },
    subscribers: { checked: false, path: "/subscribers" },
    timers: { checked: true, path: "/timers" },
  })

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {accessToken ? (
            <>
              {" "}
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
