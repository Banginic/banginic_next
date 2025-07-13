import { useState, type Dispatch, type SetStateAction } from "react";
import { courses } from "../assets/data";
import getLevelColor from "../libs/getLevelColor";
import type { CourseType } from "../models/types";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star,
  CheckCircle,

} from "lucide-react";
interface LearningProps {
  showEnrollForm?: boolean;
  setShowEnrollForm: Dispatch<SetStateAction<boolean>>;
  selectCourse?: CourseType,
  setSelectedCourse?: Dispatch<SetStateAction<CourseType | null>>;
}

function RenderCourses({ setShowEnrollForm,  setSelectedCourse } : LearningProps) {
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    message: "",
  });

  const handleEnroll = (course: CourseType) => {
    setSelectedCourse!(course);
    setFormData({ ...formData, course: course.title });
    setShowEnrollForm(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Courses
        </h2>
        <p className="text-xl text-gray-300">
          Choose the perfect course to start your web development journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(
                    course.level
                  )}`}
                >
                  {course.level}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="text-white text-sm">{course.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-300 mb-4">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-2xl font-bold text-white">
                    ${course.price}
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                  <span>{course.startDate}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-pink-400" />
                  <span>{course.students} enrolled</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  What you'll learn:
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {course.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleEnroll(course)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RenderCourses;
