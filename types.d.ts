import { ChangeEventHandler } from "react"

interface Endpoint {
  checked: boolean
  resource_key: string
  path: string
}

export type Endpoints = Record<string, Endpoint>

export interface FetchOptions {
  headers: {
    Authorization: string
  }
}

type NightbotExportButtonProps = {
  token: string
  endpoints: Endpoints
}

type NightbotExportSwitchesProps = {
  endpoints: Endpoints
  handleChange: ChangeEventHandler<HTMLInputElement>
}

type NightbotExportSelectorProps = {
  endpoints: Endpoints
  token: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}
