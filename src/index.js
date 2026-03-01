import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Rendering the root component inside React.StrictMode for highlighting potential issues
ReactDOM.render( <
    React.StrictMode >
    <
    App / >
    <
    /React.StrictMode>,
    document.getElementById("root")
);

// Register service worker only in production environment
if (process.env.NODE_ENV === "production") {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}