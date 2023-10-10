import React from "react"
import { FormGroup, FormControlLabel, Stack, Switch } from "@mui/material"
import {
  NightbotExportSwitchesProps,
  NightbotExportSelectorProps,
} from "../../types"
import { NightbotExportButton } from "./NightbotExportButton"
import { NightbotAuthButton } from "./NightbotAuthButton"

function NightbotExportSwitches({
  endpoints,
  handleChange,
}: NightbotExportSwitchesProps) {
  const switches = Object.entries(endpoints).map(([key, value]) => {
    return (
      <Stack
        key={key}
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <FormControlLabel
          label={key
            .split("_")
            .map((name) => name.charAt(0).toLocaleUpperCase() + name.slice(1))
            .join(" ")}
          checked={value.checked}
          control={
            <Switch
              name={key}
              onChange={handleChange}
            />
          }
        />
      </Stack>
    )
  })

  return (
    <>
      {switches.sort((a, b) => {
        return a.key!.localeCompare(b.key!)
      })}
    </>
  )
}

export function NightbotExportSelector({
  endpoints,
  token,
  handleChange,
}: NightbotExportSelectorProps) {
  return (
    <FormGroup>
      <NightbotExportSwitches
        endpoints={endpoints}
        handleChange={handleChange}
      />
      {token ? (
        <NightbotExportButton
          token={token}
          endpoints={endpoints}
        />
      ) : (
        <NightbotAuthButton />
      )}
    </FormGroup>
  )
}
