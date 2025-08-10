"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { CornerRightUp } from "lucide-react"
import { toast } from 'sonner'
import generateMotionJSON from '@/lib/generateResponse'

function PromptComp() {
    const [userPrompt, setUserPrompt] = useState<string>("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (userPrompt === "") {
                toast("Please Enter a Prompt or try some example prompts");
                return;
            }
    
            const jsonBlueprint = await generateMotionJSON(userPrompt);
            if(jsonBlueprint){
                console.log(jsonBlueprint)
            }
        } catch (error) {
            toast("An Unexpected Error Occured, Please try again");
            console.log(error);
        } finally {
            setUserPrompt("");
        }
        
    }
    return (
        <div className='w-full p-1 md:p-2 text-center -translate-y-14 flex flex-col items-center justify-center'>
            <h1 className='font-bold text-2xl md:text-4xl lg:text-6xl'>What do you want to create?</h1>
            <div className='md:w-[80%] w-full p-4 border-[1px] border-gray-400 rounded-xl mt-6'>
                <form className='w-full' onSubmit={handleSubmit}>
                    <textarea value={userPrompt} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserPrompt(e.target.value)} required className='border-none outline-none w-full' placeholder='enter your prompt' />
                    <div className='w-full flex justify-end'>
                        { /* I have to add the optoins here */}
                        <button type='submit'><CornerRightUp size={30} className='border-[1px] hover:bg-gray-100 border-gray-400 p-1 rounded-sm cursor-pointer' /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptComp