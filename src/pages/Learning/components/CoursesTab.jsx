import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import CourseCard from './CourseCard';
import EditCourseModal from './modals/EditCourseModal';

import Button from '../../../components/common/Button';
import { mockCourses } from '../../../data/mockCourses';

const CoursesTab = ({ onCreateCourseClick, onViewCourseDetails }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <span className="bg-primary text-white lms-radius-md d-flex align-items-center justify-content-center lms-icon-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            </span>
            My Courses
          </h4>
          <div className="text-muted small">Manage and track your enrolled courses</div>
        </div>
        <Button 
          className="btn-system btn-system-size-default btn-system-primary d-flex align-items-center gap-2 shadow-sm"
          onClick={onCreateCourseClick}
        >
          <Plus size={18} /> Create Course
        </Button>
      </div>

      <div className="d-flex gap-3 mb-4">
        <div className="position-relative flex-grow-1" style={{ maxWidth: '400px' }}>
          <Search className="position-absolute top-50 translate-middle-y text-muted ms-3" size={18} />
          <input 
            type="text" 
            className="form-control ps-5 py-2 text-dark border-secondary-subtle shadow-none lms-radius-lg" 
            placeholder="Search courses..." 
          />
        </div>
        <Button variant="secondary" className="btn btn-white border d-flex align-items-center gap-2 text-dark shadow-sm lms-hover-bg lms-radius-lg">
          <Filter size={18} /> Filters
        </Button>
      </div>

      <div className="row g-4">
        {mockCourses.map(course => (
          <div key={course.id} className="col-12 col-md-6 col-xl-4">
            <CourseCard 
              course={course} 
              onViewDetails={() => onViewCourseDetails(course.title)} 
              onEdit={() => setIsEditModalOpen(true)}
            />
          </div>
        ))}
      </div>

      <EditCourseModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
};

export default CoursesTab;
