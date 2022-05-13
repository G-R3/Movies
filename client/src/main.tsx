import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
