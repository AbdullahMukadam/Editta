import { createContext } from "react";

interface Blueprint {
    id: string,
    layers: []
}
interface ContextContent {
    BluePrints?: [Blueprint],
    storeBluePrintintoContext: (blueprint: object) => void,
    bluePrints: object[],
    getBlueprint: (id: string) => object[] | undefined
}

export const blueprintContext = createContext<ContextContent | undefined>(undefined)

export const blueprintContextProvider = blueprintContext.Provider