import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check if the request is multipart
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      console.log("Invalid content type:", contentType);
      return NextResponse.json(
        { error: "Content type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const apiKey = formData.get("apiKey");
    const providerApiKey = formData.get("providerApiKey");

    if (!providerApiKey && (apiKey !== process.env.GLOBAL_API_KEY || !apiKey)) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API Key" },
        { status: 401 }
      );
    }

    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const s3Client = new S3Client({
      endpoint: process.env.MINIO_ENDPOINT,
      region: process.env.MINIO_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || "",
        secretAccessKey: process.env.MINIO_SECRET_KEY || "",
      },
      forcePathStyle: true,
    });

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique name for the file
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    const params = {
      Bucket: process.env.MINIO_BUCKET_NAME,
      Key: `next-s3-uploads/${uniqueFileName}`,
      Body: buffer,
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(params));

    const fileUrl = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/next-s3-uploads/${uniqueFileName}`.replace(':9000', '');

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}