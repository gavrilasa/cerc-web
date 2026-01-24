import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkRateLimit, getClientIP, rateLimits } from "@/lib/rate-limit";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Allowed file types (MIME types)
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(`upload:${clientIP}`, rateLimits.upload);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many upload requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        }, 
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
          }
        }
      );
    }

    // 2. Check Authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Process File
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 4. Validate File Type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // 5. Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // 6. Convert to Buffer & Upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "cerc-cms",
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json(
      { url: result.secure_url },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimitResult.remaining),
        }
      }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}