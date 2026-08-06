import React, { useState } from "react";
import { BookOpen, HelpCircle, BarChart2 } from "lucide-react";
import CoursesTab from "./CoursesTab";
import QuizzesTab from "./QuizzesTab";
import AnalyticsTab from "./AnalyticsTab"; 
import Button from '../../../components/common/Button';

const LearningDashboard = ({ onCreateCourseClick, onViewCourseDetails }) => {
  const [activeTab, setActiveTab] = useState("courses"); 
  return (
    <div className="p-4 lms-bg-gray lms-min-h-screen">

      <div className="d-flex bg-white p-1 rounded-3 d-inline-flex mb-4 border">
        <Button variant="secondary" 
          className={`btn btn-sm fw-medium px-4 lms-radius-md ${activeTab === 'courses' ? 'btn-primary' : 'text-muted bg-white'}`} 
          onClick={() => setActiveTab('courses')}
        >
          <div className="d-flex align-items-center gap-2">
            <BookOpen size={16} /> Courses
          </div>
        </Button>
        <Button variant="secondary" 
          className={`btn btn-sm fw-medium px-4 lms-radius-md ${activeTab === 'quizzes' ? 'btn-primary' : 'text-muted bg-white'}`} 
          onClick={() => setActiveTab('quizzes')}
        >
          <div className="d-flex align-items-center gap-2"><HelpCircle size={16} /> Quizzes</div>
        </Button>
        <Button variant="secondary" 
          className={`btn btn-sm fw-medium px-4 lms-radius-md ${activeTab === 'analytics' ? 'btn-primary' : 'text-muted bg-white'}`} 
          onClick={() => setActiveTab('analytics')}
        >
          <div className="d-flex align-items-center gap-2">
            <BarChart2 size={16} /> Analytics
          </div>
        </Button>
      </div>
      {activeTab === "courses" && (
        <CoursesTab
          onCreateCourseClick={onCreateCourseClick}
          onViewCourseDetails={onViewCourseDetails}
        />
      )}
      {activeTab === "quizzes" && <QuizzesTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
    </div>
  );
};

export default LearningDashboard;
