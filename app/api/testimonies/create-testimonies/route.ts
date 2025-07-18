import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { eq, and } from "drizzle-orm";
import { testimonialTable } from "@/drizzle/schema";
import { Readable } from "stream";
import { db } from "@/drizzle/index";

//Disabel next js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
//Convert file buffer to readable stream for cloudinary
const bufferToStream = (buffer: Buffer) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
};
//Create a promise to handle multer upload
const multerUpload = (req: any): Promise<Express.Multer.File> =>
  new Promise((resolve, reject) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage }).single("photo"); // resume is form field name

    upload(req, {} as any, (err) => {
      if (err) return reject(err);
      resolve(req.file);
    });
  });

export async function POST(req: NextRequest) {
  try{
      const formData = await req.formData();
  const resume = formData.get("photo") as File;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectName = formData.get("projectName") as string;
  const rating = formData.get("rating") as string;
  const message = formData.get("message") as string;

  //Check for other input data
  if (!resume || !name || !email || !rating || !message || !projectName) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }
  console.log("Passed");

  // Check if user has already applied
  const alreadyApplied = await db
    .select()
    .from(testimonialTable)
    .where(
      and(
        eq(testimonialTable.name, name),
        eq(testimonialTable.projectName, projectName)
      )
    )
    .limit(1);
  if (alreadyApplied.length === 1) {
    return NextResponse.json(
      { success: false, message: "Already Testified" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await resume.arrayBuffer());

  // Upload to clouadinary using stream
  const streamUpload = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Testimony" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      bufferToStream(buffer).pipe(stream);
    });
  const result: any = await streamUpload();

  //Handle cloudinary error
  if (!result) {
    return NextResponse.json(
      { success: false, message: "Error Uploading Resume to clouadinary" },
      { status: 500 }
    );
  }

  const testimony = await db.insert(testimonialTable).values({
    name,
    email,
    projectName,
    message,
    rating: Number(rating),
    isVerified: true,
    photo: result.secure_url,
  });
  if (!testimony) {
    return NextResponse.json(
      { success: false, message: "Error Uploading data" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { success: true, message: "Testified successfully", data: testimony },
    { status: 201 }
  );
  }
 catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}
