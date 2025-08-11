"use client"
import React, { FormEvent, useState } from 'react'
import PromptComp from '../PromptComp/PromptComp'
import { useBlueprintContext } from '@/context/BluePrintContextProvider'
import { toast } from 'sonner'
import generateMotionJSON from '@/lib/generateResponse'
import { generateuuid } from '@/lib/generateuuid'
import MotionEditor from './MotionEditor'

function DashboardComp() {
    const [userPrompt, setUserPrompt] = useState<string>("")
    const [loading, setloading] = useState(false)
    const { storeBluePrintintoContext } = useBlueprintContext()
    const [newBlueprintId, setnewBlueprintId] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setloading(true)
            if (userPrompt === "") {
                toast("Please Enter a Prompt or try some example prompts");
                return;
            }

            const jsonBlueprint = await generateMotionJSON(userPrompt);
            if (jsonBlueprint) {
                const newId = generateuuid()
                const editedBlueprint = {
                    ...jsonBlueprint,
                    id: newId
                }
                setnewBlueprintId(newId)
                storeBluePrintintoContext(editedBlueprint)
                console.log(editedBlueprint)
            }
        } catch (error) {
            toast("An Unexpected Error Occured, Please try again");
            console.log(error);
        } finally {
            setUserPrompt("");
            setloading(false)
        }

    }
    return (
        <div className='w-full min-h-screen p-1 md:p-4 flex items-center justify-center font-brcolage-grotesque'>

            <div
                className='absolute -z-10 top-0 left-0 w-full h-full'
                style={{
                    background: 'linear-gradient(156deg,rgba(210, 255, 81, 1) 3%, rgba(22, 105, 44, 0) 30%)'
                }}
            ></div>
            <div className='w-[80%] h-full z-[999]'>
                {newBlueprintId && <MotionEditor blueprintId={newBlueprintId} />}
                <PromptComp handleSubmit={handleSubmit} loading={loading} userPrompt={userPrompt} setUserPrompt={setUserPrompt} />
            </div>
        </div>
    )
}

export default DashboardComp