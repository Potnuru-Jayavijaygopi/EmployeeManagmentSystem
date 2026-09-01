import React, { useState, useEffect } from 'react';
import LearningDashboard from './components/LearningDashboard';
import CreateCourseFlow from './components/CreateCourse/CreateCourseFlow';
import CourseDetail from './components/CourseDetail';
import './Learning.css';
import { lmsService, withFallback } from '../../services';

const Learning = () => {
  const [view, setView] = useState('dashboard'); 
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await lmsService.getCourses();
        const rawList = Array.isArray(coursesData) ? coursesData : (coursesData?.results && Array.isArray(coursesData.results)) ? coursesData.results : [];
        setCourses(rawList);
      } catch (err) {
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleCreateCourseClick = () => {
    setView('create');
  };

  const handleBackToCourses = () => {
    setView('dashboard');
    setSelectedCourseTitle(null);
  };

  const handleViewCourseDetails = (courseTitle) => {
    setSelectedCourseTitle(courseTitle);
    setView('detail');
  };

  return (
    <div className="learning-module h-100">
      {view === 'dashboard' && (
        <LearningDashboard 
          onCreateCourseClick={handleCreateCourseClick} 
          onViewCourseDetails={handleViewCourseDetails}
        />
      )}
      {view === 'create' && (
        <CreateCourseFlow 
          onBackToCourses={handleBackToCourses} 
        />
      )}
      {view === 'detail' && (
        <CourseDetail 
          courseTitle={selectedCourseTitle}
          onBackToCourses={handleBackToCourses} 
        />
      )}
    </div>
  );
};

export default Learning;
