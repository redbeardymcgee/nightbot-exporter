import React from "react"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

export function NightbotExportSwitches({ endpoints, handleChange }) {
  const switches = Object.entries(endpoints).map(([key, value]) => {
    return (
      <FormControlLabel
        key={key}
        control={
          <Switch name={key} checked={value.checked} onChange={handleChange} />
        }
        label={key
          .split("_")
          .map((name) => name.charAt(0).toLocaleUpperCase() + name.slice(1))
          .join(" ")}
      />
    )
  })

  return switches.sort((a, b) => {
    if (a.key > b.key) return 1
    if (a.key < b.key) return -1
    return 0
  })
}
export function NightbotExportSelector({ endpoints, handleChange }) {
  return (
    <FormGroup>
      <NightbotExportSwitches
        endpoints={endpoints}
        handleChange={handleChange}
      />
    </FormGroup>
  )
}
