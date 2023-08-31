import React, { useState } from "react";
import { GlobalStateContext } from "./globalStateContext";

export function GlobalState(props) {

    const [resetPage, setResetPage] = useState(false)
    const [showBackButton, setShowBackButton] = useState(true)
    const [companyCnpj, setCompanyCnpj] = useState('')
    const [companies, setCompanies] = useState([])
    const [calculationType, setCalculationType] = useState('monthly')
    const [storedCalculations, setStoredCalculations] = useState([])

    return (
        <GlobalStateContext.Provider
            value={
                {
                    resetPage,
                    setResetPage,
                    showBackButton,
                    setShowBackButton,
                    companyCnpj,
                    setCompanyCnpj,
                    companies,
                    setCompanies,
                    calculationType,
                    setCalculationType,
                    storedCalculations,
                    setStoredCalculations
                }
            }>
            {props.children}
        </GlobalStateContext.Provider>
    )

}