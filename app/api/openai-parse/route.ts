/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { PROMPTS, PromptType } from "@/lib/prompts";

interface RequestBody {
  imageUrl: string;
  analysisType: PromptType;
  apiKey: string;
  providerApiKey?: string;
}

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, analysisType, apiKey, providerApiKey } = await request.json() as RequestBody;

    console.log( { imageUrl, analysisType, apiKey, openaiApiKey: providerApiKey });

    if (apiKey !== process.env.GLOBAL_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API Key" },
        { status: 401 }
      );
    }

    if (!providerApiKey) {
      return NextResponse.json(
        { error: "Unauthorized - Api Key not found" },
        { status: 401 }
      );
    }

    const prompt = PROMPTS[analysisType].text;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${providerApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();

    return NextResponse.json({
      choices: [{
        message: {
          content: data.choices[0].message.content
        }
      }]
    });
  } catch (error: any) {
    console.error("Parse menu error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse menu" },
      { status: 500 }
    );
  }
}