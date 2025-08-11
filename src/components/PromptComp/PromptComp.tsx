"use client"

import React, { ChangeEvent, FormEvent } from 'react'
import { CornerRightUp } from "lucide-react"

interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
    loading: boolean,
    userPrompt: string,
    setUserPrompt: React.Dispatch<React.SetStateAction<string>>
}

function PromptComp({ loading, handleSubmit, userPrompt, setUserPrompt }: Props) {

    return (
        <div className='w-full p-1 md:p-2 text-center -translate-y-14 flex flex-col items-center justify-center'>
            <h1 className='font-bold text-2xl md:text-4xl lg:text-6xl'>What do you want to create?</h1>
            <div className='md:w-[80%] w-full p-4 border-[1px] border-gray-400 rounded-xl mt-6'>
                <form className='w-full' onSubmit={handleSubmit}>
                    <textarea value={userPrompt} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserPrompt(e.target.value)} required className='border-none outline-none w-full' placeholder='enter your prompt' />
                    <div className='w-full flex justify-end'>
                        { /* I have to add the optoins here */}
                        <button type='submit'><CornerRightUp size={30} className={`border-[1px] hover:bg-gray-100 ${loading ? "animate-pulse bg-gray-300" : ""} border-gray-400 p-1 rounded-sm cursor-pointer`} /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptComp