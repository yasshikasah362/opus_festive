import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

// Initialize the Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, inputImageUrl } = await req.json();

    if (!prompt || !inputImageUrl) {
      console.error("Missing prompt or image URL in request body.");
      return NextResponse.json(
        { error: "Prompt and input image URL are required." },
        { status: 400 }
      );
    }

    // Determine image type and get base64 data
    let imageData;
    let mimeType;

    if (inputImageUrl.startsWith("data:")) {
      const [header, base64Data] = inputImageUrl.split(",");
      mimeType = header.match(/:(.*?);/)?.[1] || "image/jpeg";
      imageData = base64Data;
    } else {
      console.log("Fetching image from URL:", inputImageUrl);
      const imageResponse = await fetch(inputImageUrl);
      if (!imageResponse.ok) {
        throw new Error(
          `Failed to fetch image from URL: ${imageResponse.statusText}`
        );
      }
      const imageBuffer = await imageResponse.arrayBuffer();
      imageData = Buffer.from(imageBuffer).toString("base64");

      // Set MIME type with a fallback based on file extension
      const url = new URL(inputImageUrl);
      const path = url.pathname;
      if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
        mimeType = "image/jpeg";
      } else if (path.endsWith(".png")) {
        mimeType = "image/png";
      } else {
        // Fallback to a generic image type if extension is unknown
        mimeType = imageResponse.headers.get("content-type") || "image/jpeg";
      }
    }

    // Construct the multimodal content for the API call
    const contents = [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType || "image/jpeg",
              data: imageData,
            },
          },
        ],
      },
    ];

    //  4. Call the Gemini API to generate the flyer
const result = await ai.models.generateContent({
  model: "gemini-2.0-flash-preview-image-generation",
  contents: contents,
  // Add this 'config' object back to your request
  config: {
    responseModalities: ["IMAGE", "TEXT"],
  },
});
// ... (rest of your code above this)

const response = await result.response;

// Add this check for the 'candidates' array
if (!response || !response.candidates || response.candidates.length === 0) {
  console.error("Gemini API returned an empty or invalid response:", response);
  return NextResponse.json(
    { error: "Gemini API failed to generate a response." },
    { status: 500 }
  );
}

// Find and return the generated image
const generatedImagePart = response.candidates[0].content.parts.find(
  (part) => part.image
);

if (!generatedImagePart) {
  console.error(
    "Gemini API did not return an image. Text response:",
    response.candidates[0].content.parts.find((part) => part.text)?.text
  );
  return NextResponse.json(
    { error: "Gemini did not return an image for this request." },
    { status: 500 }
  );
}

const generatedImageUrl = `data:${generatedImagePart.image.mimeType};base64,${generatedImagePart.image.data}`;

return NextResponse.json({ imageUrl: generatedImageUrl }, { status: 200 });

// ... (rest of your code below this)
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while generating the flyer." },
      { status: 500 }
    );
  }
}