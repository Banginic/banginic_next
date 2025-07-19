import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { eq, and } from "drizzle-orm";
import { projectTable } from "@/drizzle/schema";
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
    const upload = multer({ storage }).array("photos", 4); // photos is form field name maximum 4

    upload(req, {} as any, (err) => {
      if (err) return reject(err);
      resolve(req.file);
    });
  });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photos = formData.getAll("photos") as File[]; // Get 4 photos object as an array
    const projectName = formData.get("projectName") as string;
    const story = formData.get("story") as string;
    const approach = formData.get("approach") as string;
    const designer = formData.get("designer") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const category = formData.get("category") as string;

    //Check for other input data
    if (
      !photos ||
      !url ||
      !story ||
      !approach ||
      !designer ||
      !projectName ||
      !description ||
      !category
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    console.log("Passed");

    // Check if user has already applied
    const alreadyApplied = await db
      .select()
      .from(projectTable)
      .where(
        and(
          eq(projectTable.projectName, projectName),
          eq(projectTable.category, category)
        )
      )
      .limit(1);
    if (alreadyApplied.length === 1) {
      return NextResponse.json(
        { success: false, message: "Already Added" },
        { status: 400 }
      );
    }

    // Upload to clouadinary using stream
    const uploadToCloudinary = (buffer: Buffer): Promise<any> =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Projects" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        bufferToStream(buffer).pipe(stream);
      });

    const result = await Promise.all(
      photos.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToCloudinary(buffer);
        return result.secure_url; // or full result
      })
    );

    //Handle cloudinary error
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Error Uploading Resume to clouadinary" },
        { status: 500 }
      );
    }

    const project = await db.insert(projectTable).values({
      url,
      category,
      projectName,
      description,
      story,
      approach,
      designer,
      photos: result,
    });
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Error Uploading data" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Project created successfully", data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json(
      { message: "Server error", error, success: false },
      { status: 500 }
    );
  }
}
