import React from "react"
import Button from "@mui/material/Button"

export function NightbotAuthButton() {
  const scope = [
    "commands",
    "commands_default",
    "regulars",
    "song_requests_playlist",
    "subscribers",
    "timers",
  ].join(" ")
  const params = new URLSearchParams({
    client_id: "db258d5003bf9cef2316ccfd22aca141",
    redirect_uri: "https://localhost:3000",
    response_type: "token",
    scope,
    state: "FIXME",
  })
  const url = new URL(
    `https://api.nightbot.tv/oauth2/authorize?${params.toString()}`
  )

  return (
    <Button variant="contained" href={`${url.toString()}`}>
      Authorize
    </Button>
  )
}
