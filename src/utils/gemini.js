import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiModel = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    return genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
};

