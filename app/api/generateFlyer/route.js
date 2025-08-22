import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) throw new Error("Prompt is missing");

    // Define the Gemini API endpoint and your API key
    const geminiApiUrl = "https://generativeai.googleapis.com/v1alpha2/projects/intense-sled-449906-q0/locations/us-central1/models/gemini-2.0-flash-exp-image-generation:generateImage";
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Gemini API Key loaded:", !!apiKey);
    // Prepare the request payload
    const requestPayload = {
      prompt: prompt,
      generationConfig: {
        responseModalities: ["Image"]
      }
    };

    // Make the API request to Gemini
    const response = await fetch(`${geminiApiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    const data = await response.json();

    if (response.ok) {
      const imageUrl = data.imageUrl;
      if (!imageUrl) throw new Error("No image returned from Gemini");
      return NextResponse.json({ imageUrl });
    } else {
      throw new Error(data.error.message || "Failed to generate image");
    }
  } catch (err) {
    console.error("Server ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
