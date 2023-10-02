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
    setEndpoints({
      ...endpoints,
      [event.target.name]: event.target.checked,
    })
  }

  const [endpoints, setEndpoints] = useState({
    user: false,
    channel: false,
    custom_commands: true,
    default_commands: true,
    regulars: false,
    playlist: false,
    song_request_settings: false,
    song_queue: false,
    spam_filters: false,
    subscribers: false,
    timers: true,
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
