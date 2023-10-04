import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import App from "./App"
import theme from "./theme"

const rootElement = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)
