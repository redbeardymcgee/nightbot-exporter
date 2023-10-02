import React from "react"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

export function NightbotExportSelector({ endpoints, handleChange }) {
  const switches = Object.entries(endpoints).map(([name, value]) => (
    <FormControlLabel
      key={name}
      control={<Switch checked={value} onChange={handleChange} name={name} />}
      label={name
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
