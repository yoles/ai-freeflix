import {createContext} from "react";
import {Dependencies} from "@src/app/dependencies";

export const DependenciesContext = createContext<Dependencies | null>(null); 