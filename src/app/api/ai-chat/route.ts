import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const systemInstruction =
    "You are GUZO's friendly African tourism assistant. " +
    "Help travelers discover destinations and plan trips. " +
    "Do not invent prices, availability, or booking details. " +
    "If you do not have verified information, say so.";

function isTemporaryError(error: unknown): boolean {
    if (typeof error !== "object" || error === null) {
        return false;
    }

    const status = "status" in error ? error.status : undefined;

    return (
        status === 408 ||
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
    );
}

async function getGeminiResponse(message: string): Promise<string> {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: message,
        config: {
            systemInstruction,
            maxOutputTokens: 500,
        },
    });

    if (!response.text) {
        throw new Error("Gemini returned an empty response.");
    }

    return response.text;
}

async function getGroqResponse(message: string): Promise<string> {
    const ai = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await ai.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content: systemInstruction,
            },
            {
                role: "user",
                content: message,
            },
        ],
        max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
        throw new Error("Groq returned an empty response.");
    }

    return reply;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const message = body.message;

        if (typeof message !== "string" || !message.trim()) {
            return NextResponse.json(
                { error: "Please provide a message." },
                { status: 400 }
            );
        }

        if (message.length > 2000) {
            return NextResponse.json(
                { error: "Message is too long." },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API key is missing." },
                { status: 500 }
            );
        }

        try {
            const reply = await getGeminiResponse(message);

            return NextResponse.json({
                reply,
                provider: "gemini",
            });
        } catch (error) {
            if (!isTemporaryError(error)) {
                throw error;
            }

            console.warn(
                "Gemini temporarily unavailable. Trying Groq..."
            );
        }

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Both AI providers are unavailable." },
                { status: 503 }
            );
        }

        const reply = await getGroqResponse(message);

        return NextResponse.json({
            reply,
            provider: "groq",
        });
    } catch (error) {
        console.error("AI chat error:", error);

        return NextResponse.json(
            {
                error: "Unable to get an AI response. Please try again.",
            },
            { status: 500 }
        );
    }
}