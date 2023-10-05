import { ChangeEventHandler } from "react"

interface Endpoint {
  checked: boolean
  key: string
  path: string
}

export interface Endpoints {
  [key: string]: Endpoint
}

export interface FetchOptions {
  headers: {
    Authorization: string
  }
}

interface NightbotExportButtonProps {
  token: string
  endpoints: Endpoints
}

interface NightbotExportSwitchesProps {
  endpoints: Endpoints
  handleChange: ChangeEventHandler<HTMLInputElement>
}

// export interface NightbotExportSwitches {
//   ({ endpoints, handleChange }: NightbotExportSwitchesProps): JSX.Element
// }
// export interface NightbotExportSelector {}
