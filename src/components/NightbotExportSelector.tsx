import React, { ChangeEventHandler } from "react"
import { FormGroup } from "@mui/material"
import { FormControlLabel } from "@mui/material"
import { Switch } from "@mui/material"

import { Endpoints } from "../App"

type NightbotExportSwitchesProps = {
  endpoints: Endpoints
  handleChange: ChangeEventHandler<HTMLInputElement>
}

function NightbotExportSwitches({
  endpoints,
  handleChange,
}: NightbotExportSwitchesProps) {
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

  return (
    <>
      {switches.sort((a, b) => {
        if (a.key !== null && b.key !== null) {
          return a.key.localeCompare(b.key)
        }
        return 0
      })}
    </>
  )
}

export function NightbotExportSelector({
  endpoints,
  handleChange,
}: NightbotExportSwitchesProps) {
  return (
    <FormGroup>
      <NightbotExportSwitches
        endpoints={endpoints}
        handleChange={handleChange}
      />
    </FormGroup>
  )
}
