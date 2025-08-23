import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, inputImageUrl } = await req.json();

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`
        },
        body: JSON.stringify({
          text_prompts: [{ text: `${prompt} Input image: ${inputImageUrl}` }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Stability API error:", data);
      return NextResponse.json({ error: "Stability API error", details: data }, { status: 500 });
    }

    if (!data.artifacts || data.artifacts.length === 0) {
      return NextResponse.json({ error: "No image returned from Stability API" }, { status: 500 });
    }

    const base64_image = data.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${base64_image}`;

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("Error in /api/generateFlyer:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
