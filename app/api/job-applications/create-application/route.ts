import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { eq, and } from "drizzle-orm";
import { jobTable, newEmployeeTable } from "@/drizzle/schema";
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
    const upload = multer({ storage }).single("resume"); // resume is form field name

    upload(req, {} as any, (err) => {
      if (err) return reject(err);
      resolve(req.file);
    });
  });

export async function POST(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const jobId = searchParams.get("jobId");

  const formData = await req.formData();
  const resume = formData.get("resume") as File;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const motivation = formData.get("motivation") as string;

  //Check for other input data
  if (!resume || !name || !email || !phone || !motivation) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  //Check if Job id was submited
  if (!jobId) {
    return NextResponse.json(
      { success: false, message: "Please Provide Job ID" },
      { status: 400 }
    );
  }

  // Check if user has already applied
  const alreadyApplied = await db
    .select()
    .from(newEmployeeTable)
    .where(
      and(eq(newEmployeeTable.name, name), eq(newEmployeeTable.jobId, Number(jobId)))
    )
    .limit(1);
  if (alreadyApplied.length === 1) {
    return NextResponse.json(
      { success: false, message: "Already Applied" },
      { status: 400 }
    );
  }

  // Find the exact job
  const job = await db
    .select()
    .from(jobTable)
    .where(eq(jobTable.id, Number(jobId)))
    .limit(1);
  if (job.length === 0) {
    return NextResponse.json(
      { success: false, message: "No Job available with this ID." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await resume.arrayBuffer());

  // Upload to clouadinary using stream
  const streamUpload = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Job resumes" },
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

  const newEmployee = await db
    .insert(newEmployeeTable)
    .values({
      name,
      email,
      phone,
      motivation,
      job: job[0].title,
      jobId: Number(jobId),
      resume: result.secure_url,
    });
    if(!newEmployee){
           return NextResponse.json(
      { success: false, message: "Error Uploading data" },
      { status: 500 }
    );
    }
    return NextResponse.json({ success: true, message: 'Job Applied successfully', data: newEmployee}, {status: 201})
}
