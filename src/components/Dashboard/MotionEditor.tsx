"use client"
import { useBlueprintContext } from '@/context/BluePrintContextProvider'
import React, { useEffect, useState } from 'react'

interface Props {
    blueprintId: string
}

function MotionEditor({ blueprintId }: Props) {
    const { getBlueprint } = useBlueprintContext()
    const [newbluePrint, setBluePrint] = useState<object[]>([])

    useEffect(() => {
        if (blueprintId) {
            const bluePrint = getBlueprint(blueprintId)
            if (bluePrint) {
                setBluePrint(bluePrint)
                console.log("motion editor:", bluePrint)
            }
        }
    }, [blueprintId, getBlueprint]);

    return (
        <div className='w-full'>
            <h1>Motion Editor</h1>
        </div>
    )
}

export default MotionEditor