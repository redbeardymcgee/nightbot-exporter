import { ChangeEventHandler } from "react"

type Endpoint = {
  checked: boolean
  key: string
  path: string
}

export type Endpoints = Record<string, Endpoint>

export type NightbotExportButtonProps = {
  accessToken: string
  endpoints: Endpoints
}

export type NightbotExportSwitchesProps = {
  endpoints: Endpoints
  handleChange: ChangeEventHandler<HTMLInputElement>
}

export type Headers = {
  headers: {
    Authorization: string
  }
}
