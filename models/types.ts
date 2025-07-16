import { StaticImageData } from "next/image";

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
  data?:
    | {
        id: number;
        subject: string;
        body: string;
      }[]
    | [];
}