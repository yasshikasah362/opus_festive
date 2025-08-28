import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, inputImageUrl } = body;

    const response = await fetch("http://localhost:5000/api/generateFlyer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, inputImageUrl }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in proxy route:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
