import React, { useState, useEffect } from "react"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
// import Link from "@mui/material/Link"
import { NightbotAuthButton } from "./NightbotAuthButton"
import { NightbotExportButton } from "./NightbotExportButton"
import { NightbotExportSelector } from "./NightbotExportSelector"

export default function App() {
  const [accessToken, setAccessToken] = useState(null)

  const params = new URLSearchParams(window.location.hash.replace("#", ""))

  useEffect(() => {
    if (params.get("access_token")) {
      setAccessToken(params.get("access_token"))
    }
  }, [params])

  const [endpoints, setEndpointsState] = useState({
    user: { checked: false, path: "" },
    channel: { checked: false, path: "" },
    custom_commands: { checked: true, path: "" },
    default_commands: { checked: false, path: "" },
    regulars: { checked: true, path: "" },
    playlist: { checked: false, path: "" },
    song_queue: { checked: false, path: "" },
    spam_filters: { checked: true, path: "" },
    subscribers: { checked: false, path: "" },
    timers: { checked: true, path: "" },
  })

  const handleChange = (event) => {
    setEndpointsState({
      ...endpoints,
      [event.target.name]: event.target.checked,
    })
  }

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
