import { ChangeEventHandler } from "react"

interface Endpoint {
  checked: boolean
  key: string
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
