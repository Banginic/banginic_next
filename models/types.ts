import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavlinkTypes{
    label: string;
    icon: StaticImageData;
    href: string
}
// PROJECTS
export interface Project{
  _id:string;
  approach: string;
  category: string;
  createdAt: Date;
  description: string;
  designer:string;
  photos: string[] | [];
  projectName: string;
  story:string;
  updatedAt:string;
  url:string

}
 export interface ProjectTypes{
  success: boolean;
  statusCode: number;
  message:string;
  projects: Project[]
}

//TESTIMONIALS
interface Testimony{
  _id:string;
    projectName: string;
    clientName:string;
    createdAt:Date;
    updatedAt: Date;
    isVerified:boolean;
    rating:number;
    photo:string;
    emailAddress: string;
    message:string
}
export interface TestimonialsTypes{
  success: boolean;
  statusCode: number;
  message:string;
  testimonies: Testimony[]
}
export interface SingleProject{
success: boolean;
  statusCode: number;
  message:string;
  project: Project
}
 export interface CourseType {
    id:number;
    title:string;
    description: string;
    price: number;
    startDate: string;
    duration: string;
    level:string;
    students: number;
    rating: number; 
    features: string[];
    image: string
}

type SuccessResponse = { success: boolean; message: string; };
type ErrorResponse = { success: boolean; error:string };

export type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
  
}

export interface JobTypes extends ApiResponse {
  data?:
    | {
        id: number;
        title: string;
        location: string;
        description: string;
        createdAt: Date;
        latestDate: Date | string;
      }[]
    | [];
}
export interface NewsTypes extends ApiResponse {
  data:
    | {
        id: number;
        subject: string;
        body: string;
      }[]
    | [];
}

export interface MessagesType extends ApiResponse{
  data: {
    id: number;
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string
    createdAt: Date
  }[] | []};

  export interface NewsletterSubsTypes extends ApiResponse {
    data: {
      id: number;
      email: string;
      consent: boolean;
      createdAt: Date
    }[] | []
  }
  export interface JobApplicationType extends ApiResponse {
    data: {
      id: number;
      email: string;
      name:string;
      phone: string;
      job:string;
      motivation: string;
      resume: string;
      jobId: number
      createdAt: Date
    }[] | []
  }

  export interface TestimonialsTypes extends ApiResponse {
    data: {
      id?: number,
      name: string;
      photo: string | null;
      message: string;
      projectName: string;
      isVarified?: boolean;
      email: string;
      rating: number;
      createdAt: Date
    }[] | []
  }

  type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string
}
  type Admin = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean
  password?: string
}

export type UserType = User  | null
export type AdminType = Admin | null

export interface EmployeeType extends ApiResponse {
  data: {
  id: number;
  name: string;
  bio: string;
  position: string;
  qualification: boolean
  photo: string;
  hiredDate: Date;
  socialLinks: { [key: string]: string} [] | [];
  phone: string
  }[] | []
}
export interface ProjectType extends ApiResponse {
  data: {
  id: number;
  projectName: string;
  description: string;
  url: string;
  category: string
  designer: string
  approach: string
  story: string
  photos: string[];
  createdAt: Date
  }[] | []
}
export interface ProjectObjectType  
  {
  id: number;
  projectName: string;
  description: string;
  url: string;
  category: string
  designer: string
  approach: string
  story: string
  photos: string[];
  createdAt: Date
  
}


 export interface PlatformType {
    name: string;
    iconst: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> ;
    label: string
  }