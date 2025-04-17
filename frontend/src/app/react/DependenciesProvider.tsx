import React from "react";
import {Dependencies} from "@src/app/dependencies";
import {DependenciesContext} from "./DependenciesContext";

type DependenciesProviderProps = {
    dependencies: Dependencies;
    children: React.ReactNode;
}

export const DependenciesProvider = ({dependencies, children}: DependenciesProviderProps) => {
    return (
        <DependenciesContext.Provider value={dependencies}>
            {children}
        </DependenciesContext.Provider>
    );
}
