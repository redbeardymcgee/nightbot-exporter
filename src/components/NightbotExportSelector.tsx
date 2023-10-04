import React from "react"
import { FormGroup, FormControlLabel, Stack, Switch } from "@mui/material"

import { NightbotExportSwitchesProps } from "../../types/types"

function NightbotExportSwitches({
  endpoints,
  handleChange,
}: NightbotExportSwitchesProps) {
  const switches = Object.entries(endpoints).map(([key, value]) => {
    return (
      <Stack key={key} direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          label={key
            .split("_")
            .map((name) => name.charAt(0).toLocaleUpperCase() + name.slice(1))
            .join(" ")}
          checked={value.checked}
          control={<Switch name={key} onChange={handleChange} />}
        />
      </Stack>
    )
  })

  return (
    <>
      {switches.sort((a, b) => {
        if (a.key && b.key) {
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
