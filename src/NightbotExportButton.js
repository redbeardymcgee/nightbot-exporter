import React from "react"
import Button from "@mui/material/Button"

export function NightbotExportButton({ accessToken, endpoints }) {
  const urls = Object.values(endpoints).filter((value) => value.checked)
  console.log(urls)
  const url = new URL(`https://api.nightbot.tv/1/${endpoints}`)
  const handleExport = async () => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const payload = await res.json()
    console.log(payload)
    return payload
  }

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  )
}
