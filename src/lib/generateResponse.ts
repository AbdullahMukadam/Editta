"use server"
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function generateMotionJSON(prompt: string) {
    try {
        const tools = [{
            functionDeclarations: [{
                name: "createMotionGraphic",
                description: "Creates a motion graphic scene based on a user prompt.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        duration: {
                            type: SchemaType.NUMBER,
                            description: "Total duration of the scene in seconds.",
                        },
                        layers: {
                            type: SchemaType.ARRAY,
                            description: "Array of visual elements in the scene.",
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    type: {
                                        type: SchemaType.STRING,
                                        enum: ["background", "text", "image"],
                                        description: "Type of the layer element."
                                    },
                                    content: {
                                        type: SchemaType.STRING,
                                        description: "Text content for the layer."
                                    },
                                    src: {
                                        type: SchemaType.STRING,
                                        description: "URL for an image/video asset."
                                    },
                                    x: { 
                                        type: SchemaType.NUMBER,
                                        description: "X position of the layer."
                                    },
                                    y: { 
                                        type: SchemaType.NUMBER,
                                        description: "Y position of the layer."
                                    },
                                },
                                required: ["type"]
                            },
                        },
                    },
                    required: ["duration", "layers"]
                },
            }],
        }];

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            tools: tools,
            toolConfig: {
                functionCallingConfig: {
                    mode: "ANY",
                    allowedFunctionNames: ["createMotionGraphic"]
                }
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        const chat = model.startChat();

        const result = await chat.sendMessage(prompt);

        const call = result.response.functionCalls()?.[0];
        if (call) {
            const jsonBlueprint = call.args;
            console.log("Successfully generated JSON blueprint:", jsonBlueprint);
            return jsonBlueprint;
        } else {
            throw new Error("AI did not return a valid function call.");
        }

    } catch (error) {
        console.log(error);
        throw new Error("An Error Occurred while generating motion JSON");
    }
}

export default generateMotionJSON;