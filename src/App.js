// App.js — Root React component
// Sets up the global state using useReducer and provides it to all child components
// via LayoutContext (React Context API)

import React, { Fragment, useReducer } from "react";
import Routes from "./components";  // Main router component (renders all pages)
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

function App() {
    // Global state: holds cart, wishlist, user info, etc.
    // dispatch is used by child components to update the global state
    const [data, dispatch] = useReducer(layoutReducer, layoutState);

    return (
        <Fragment>
            {/* Provide global state and dispatch to the entire component tree */}
            <LayoutContext.Provider value={{ data, dispatch }}>
                <Routes />
            </LayoutContext.Provider>
        </Fragment>
    );

console.log("Krutik change");
}

export default App;
