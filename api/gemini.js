// api/gemini.js — Vercel Serverless Function
// The GEMINI_API_KEY env var has NO VITE_ prefix, so it is NEVER sent to the browser.
// React calls /api/gemini instead of Google directly.

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { query } = req.body || {};

    if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Missing or invalid query" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key not configured on server" });
    }

    const prompt = `You are a movie recommendation expert. 
A user is searching for: "${query.trim()}"
Return ONLY a comma-separated list of exactly 5 movie titles that best match this description. 
Do not include any explanation, numbering, or extra text. Just the movie titles separated by commas.
Example format: Inception, Interstellar, The Matrix, Tenet, Avatar`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API error:", errText);
            return res.status(502).json({ error: "Gemini API request failed" });
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!text) {
            return res.status(502).json({ error: "Empty response from Gemini" });
        }

        return res.status(200).json({ text });
    } catch (err) {
        console.error("Serverless function error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
