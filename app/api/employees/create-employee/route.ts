import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { eq, and } from "drizzle-orm";
import { employeeTable } from "@/drizzle/schema";
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
  const photo = formData.get("photo") as File;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const position = formData.get("position") as string;
  const qualification = formData.get("qualification") as string;
  const phone = formData.get("phone") as string;
  const socialLinks = formData.get("phone") as object;

  //Check for other input data
  if (!photo || !name || !bio || !position || !qualification || !phone || !socialLinks) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }
  console.log("Passed");

  // Check if user has already applied
  const alreadyApplied = await db
    .select()
    .from(employeeTable)
    .where(
      and(
        eq(employeeTable.name, name),
        eq(employeeTable.position, position),
        eq(employeeTable.qualification, qualification),
      )
    )
    .limit(1);
  if (alreadyApplied.length === 1) {
    return NextResponse.json(
      { success: false, message: "Already Hired" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await photo.arrayBuffer());

  // Upload to clouadinary using stream
  const streamUpload = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Employees" },
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

  const employee = await db.insert(employeeTable).values({
    name,
    bio,
    phone,
    position,
    qualification,
    socialLinks,
    photo: result.secure_url,
  });
  if (!employee) {
    return NextResponse.json(
      { success: false, message: "Error Uploading employee" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { success: true, message: "Employed successfully", data: employee },
    { status: 201 }
  );
  }
 catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}
