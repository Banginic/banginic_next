'use client'
import { useState } from "react";

import { RenderCourses, LearningForm } from '@/components/exportComp'
import type { CourseType } from "@/models/types";


function Learning() {
         const [selectedCourse, setSelectedCourse] = useState< CourseType | null>(null);
        const [showEnrollForm, setShowEnrollForm] = useState(false);
    
  return (
    <div className="min-h-screen ">
       <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Banginic Academy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your career with our comprehensive web development courses. 
              Learn from industry experts and build real-world projects.
            </p>
          </div>
        </div>
      </header>
        {/* Hero Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">500+</div>
            <div className="text-gray-300">Students Enrolled</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-3xl font-bold text-blue-400">95%</div>
            <div className="text-gray-300">Job Placement Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-3xl font-bold text-pink-400">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-3xl font-bold text-green-400">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </div>
      </section>
      <RenderCourses setShowEnrollForm={setShowEnrollForm} showEnrollForm={showEnrollForm} setSelectedCourse={setSelectedCourse}/>
      <LearningForm setShowEnrollForm={setShowEnrollForm} showEnrollForm={showEnrollForm} selectedCourse={selectedCourse!}/>
    </div>
  );
}

export default Learning;
