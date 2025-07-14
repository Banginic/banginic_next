'use client'
import { useState, type ChangeEvent, type FormEvent, type Dispatch, type SetStateAction } from "react";
import type { CourseType } from "../models/types";
import { call, email, person, placeholdeImage } from "@/assets/photos";
import Image from "next/image";

interface LearningProps {
  showEnrollForm?: boolean;
  setShowEnrollForm: Dispatch<SetStateAction<boolean>>;
  selectedCourse?: CourseType,
  setSelectedCourse?: Dispatch<SetStateAction<CourseType | null>>;
}
function LearningForm({showEnrollForm, setShowEnrollForm, selectedCourse} : LearningProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you for enrolling in ${formData.course}! We'll contact you soon with payment details and course materials.`
    );
    setShowEnrollForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      experience: "",
      message: "",
    });
  };
  
   if(showEnrollForm){
    return (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-purple-500/20"
      >
        <div className="flex justify-between items-center  mb-6">
          <h3 className="text-2xl font-bold text-white">Enroll in Course</h3>
          <button
            type="button"
            onClick={() => setShowEnrollForm(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {selectedCourse && (
          <div className="bg-purple-900/30 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-white">{selectedCourse.title}</h4>
            <p className="text-purple-300">Price: ${selectedCourse.price}</p>
            <p className="text-purple-300">
              Starts: {selectedCourse.startDate}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
              <Image
                src={person}
                width={25}
                alt={'./placeholder.png'}
                className="absolute left-4 top-3.5  text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="your.email@example.com"
              />
              <Image
                src={email}
                width={25}
                alt={'./placeholder.png'}
                className="absolute left-4 top-3.5  text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="+1 (555) 123-4567"
              />
              <Image
                src={call}
                width={25}
                alt={'./placeholder.png'}
                className="absolute left-4 top-3.5  text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Programming Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="">Select your level</option>
              <option value="none">No experience</option>
              <option value="beginner">Beginner (less than 1 year)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="advanced">Advanced (3+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Tell us about your goals or any questions..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowEnrollForm(false)}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 cursor-pointer rounded-lg transition-all duration-300"
            >
              Submit Enrollment
            </button>
          </div>
        </div>
      </form>
    </div>
    )
    return null
   }
  
}

export default LearningForm;
