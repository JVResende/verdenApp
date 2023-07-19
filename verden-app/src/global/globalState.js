import React, { useState } from "react";
import { GlobalStateContext } from "./globalStateContext";

export function GlobalState(props) {

    const [resetPage, setResetPage] = useState(false)

    return (
        <GlobalStateContext.Provider
            value={
                {
                    resetPage,
                    setResetPage
                }
            }>
            {props.children}
        </GlobalStateContext.Provider>
    )

}