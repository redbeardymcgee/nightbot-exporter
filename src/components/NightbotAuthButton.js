import React from "react"
import Button from "@mui/material/Button"

const SCOPE = [
  "channel",
  "commands",
  "commands_default",
  "regulars",
  "song_requests",
  "song_requests_queue",
  "song_requests_playlist",
  "spam_protection",
  "subscribers",
  "timers",
].join(" ")

const PARAMS = new URLSearchParams({
  client_id: "db258d5003bf9cef2316ccfd22aca141",
  redirect_uri: "https://localhost:3000",
  response_type: "token",
  scope: SCOPE,
  state: "FIXME",
})

const URL = `https://api.nightbot.tv/oauth2/authorize?${PARAMS.toString()}`

export function NightbotAuthButton() {
  return (
    <Button variant="contained" href={URL}>
      Authorize
    </Button>
  )
}
