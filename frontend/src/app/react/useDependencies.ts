import {useContext} from "react";
import {DependenciesContext} from "@src/app/react/DependenciesContext";

export const useDependencies = () => useContext(DependenciesContext); 