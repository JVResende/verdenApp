import React, { useState } from "react";
import { GlobalStateContext } from "./globalStateContext";

export function GlobalState(props) {

    const [resetPage, setResetPage] = useState(false)
    const [showBackButton, setShowBackButton] = useState(true)

    return (
        <GlobalStateContext.Provider
            value={
                {
                    resetPage,
                    setResetPage,
                    showBackButton,
                    setShowBackButton
                }
            }>
            {props.children}
        </GlobalStateContext.Provider>
    )

}