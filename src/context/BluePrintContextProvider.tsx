"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
}
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

const blueprintContext = createContext<ContextContent | undefined>(undefined)


function BluePrintContextProvider({ children }: Props) {
    const [bluePrints, setbluePrints] = useState<object[]>([])

    const storeBluePrintintoContext = (blueprint: object) => {
        if (blueprint) {
            console.log("context:", blueprint)
            setbluePrints((prev) => [...prev, blueprint])
        }
    }

    useEffect(() => {
        console.log("context blueprints:", bluePrints);
    }, [bluePrints]);

    const getBlueprint = (id: string) => {
        if (id) {
            const blueprint = bluePrints.filter((jsonblueprint) => jsonblueprint.id === id);
            if (blueprint) {
                return blueprint
            }
        }
    }



    return (
        <blueprintContext.Provider value={{ storeBluePrintintoContext, bluePrints, getBlueprint }}>
            {children}
        </blueprintContext.Provider>
    )
}

export const useBlueprintContext = () => {
    const context = useContext(blueprintContext)
    if (!context) {
        throw new Error("useBlueprintContext must be used within an BlueprintContextProvider");
    }
    return context;
}

export default BluePrintContextProvider

