import React from "react"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

export function NightbotExportSelector({ endpoints, handleChange }) {
  const switches = Object.entries(endpoints).map(([key, value]) => (
    <FormControlLabel
      key={key}
      control={
        <Switch checked={value.checked} onChange={handleChange} name={key} />
      }
      label={key
        .split("_")
        .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
        .join(" ")}
    />
  ))
  return (
    <FormGroup>
      {switches.sort((a, b) => {
        if (a.key > b.key) return 1
        if (a.key < b.key) return -1
        return 0
      })}
    </FormGroup>
  )
}
