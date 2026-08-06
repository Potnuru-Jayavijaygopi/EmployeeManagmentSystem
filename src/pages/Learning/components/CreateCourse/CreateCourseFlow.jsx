import React, { useState } from 'react';
import { ArrowLeft, MonitorPlay, HelpCircle, BarChart2 } from 'lucide-react';
import Step1Basics from './Step1Basics';
import Step2Content from './Step2Content';
import Step3Assign from './Step3Assign';
import Step4Rules from './Step4Rules';

import Step5Review from './Step5Review';
import Button from '../../../../components/common/Button';

const steps = [
  { id: 1, label: 'Course Basics' },
  { id: 2, label: 'Content' },
  { id: 3, label: 'Assign Users' },
  { id: 4, label: 'Completion Rules' },
  { id: 5, label: 'Review & Publish' }
];

const CreateCourseFlow = ({ onBackToCourses }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-4 lms-bg-gray lms-min-h-screen">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="bg-white border rounded-3 p-1 d-inline-flex">
          <Button className="btn btn-sm btn-primary px-3 fw-medium d-flex align-items-center gap-2 lms-radius-md">
            <MonitorPlay size={16} /> Courses
          </Button>
          <Button variant="secondary" className="btn btn-sm px-3 fw-medium text-muted bg-white d-flex align-items-center gap-2 lms-radius-md">
            <HelpCircle size={16} /> Quizzes
          </Button>
          <Button variant="secondary" className="btn btn-sm px-3 fw-medium text-muted bg-white d-flex align-items-center gap-2 lms-radius-md">
            <BarChart2 size={16} /> Analytics
          </Button>
        </div>

        <Button variant="outline" 
          className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary"
          onClick={onBackToCourses}
        >
          <ArrowLeft size={16} className="me-2" /> Back to Courses
        </Button>
      </div>

      <div className="mb-4">
        <h2 className="fw-bold mb-1">Create New Course</h2>
        <p className="text-muted mb-0">Fill in the details to create and publish a course</p>
      </div>

      <div className="bg-white border rounded-4 d-flex overflow-hidden mb-4 shadow-sm">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          let circleBgClass = 'bg-secondary bg-opacity-10 text-muted';
          let textClass = 'text-muted';

          if (isCompleted) {
            circleBgClass = 'bg-success text-white';
            textClass = 'text-success';
          } else if (isActive) {
            circleBgClass = 'bg-primary text-white';
            textClass = 'text-primary';
          }

          return (
            <React.Fragment key={step.id}>
              <div 
                className={`flex-grow-1 p-3 d-flex align-items-center justify-content-center gap-2 position-relative lms-cursor-pointer ${isActive ? 'bg-primary bg-opacity-10' : ''}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold lms-icon-sm lms-font-md ${circleBgClass}`}>
                  {step.id}
                </div>
                <span className={`fw-medium small ${textClass}`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="border-end w-px"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="bg-white border rounded-4 p-4 shadow-sm">
        {currentStep === 1 && <Step1Basics onNext={handleNext} onCancel={onBackToCourses} />}
        {currentStep === 2 && <Step2Content onNext={handleNext} onPrev={handlePrev} />}
        {currentStep === 3 && <Step3Assign onNext={handleNext} onPrev={handlePrev} />}
        {currentStep === 4 && <Step4Rules onNext={handleNext} onPrev={handlePrev} />}
        {currentStep === 5 && <Step5Review onFinish={onBackToCourses} onPrev={handlePrev} />}
      </div>

    </div>
  );
};

export default CreateCourseFlow;
