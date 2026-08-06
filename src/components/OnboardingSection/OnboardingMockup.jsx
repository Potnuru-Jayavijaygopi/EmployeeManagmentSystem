import React from 'react';
import { User, UserPlus, CheckSquare, Activity, TrendingUp, ArrowUp } from 'lucide-react';

export const OnboardingMockup = ({ stepId }) => {
  if (stepId === 1) {
    return (
      <div className="position-relative d-inline-block text-start w-100 mt-4" style={{ maxWidth: '400px' }}>
        <div className="rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="d-flex align-items-center mb-4 gap-3">
            <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
              <User size={24} color="#2563EB" />
            </div>
            <div>
              <h5 className="m-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>Organization Setup</h5>
              <div className="text-muted small">Acme Corp · 4 Departments</div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Total Employees</span>
            <span className="fw-bold text-dark">128</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Departments</span>
            <span className="fw-bold text-dark">4</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Open Roles</span>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark">7</span>
              <span className="badge bg-primary bg-opacity-10 text-primary fw-medium rounded-pill px-2">Hiring</span>
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-medium" style={{ fontSize: '0.85rem' }}>Setup Progress</span>
              <span className="text-primary fw-bold" style={{ fontSize: '0.85rem' }}>78%</span>
            </div>
            <div className="progress" style={{ height: '6px', borderRadius: '4px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '78%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
        
  
        <div className="position-absolute bg-white rounded-pill shadow border px-3 py-2 d-flex align-items-center gap-2" style={{ top: '-15px', right: '-20px', zIndex: 2 }}>
          <UserPlus size={16} color="#2563EB" />
          <span className="fw-bold text-dark small">12 members added</span>
        </div>
      </div>
    );
  }

  if (stepId === 2) {
    return (
      <div className="position-relative d-inline-block text-start w-100 mt-4" style={{ maxWidth: '400px' }}>
        <div className="rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="d-flex align-items-center mb-4 gap-3">
            <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
              <CheckSquare size={24} color="#2563EB" />
            </div>
            <div>
              <h5 className="m-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>Workflow Assignment</h5>
              <div className="text-muted small">Onboarding · Week 1</div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Checklists Active</span>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark">24</span>
              <span className="badge bg-success bg-opacity-10 text-success fw-medium rounded-pill px-2">Live</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Policies Distributed</span>
            <span className="fw-bold text-dark">11</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Completion Rate</span>
            <span className="fw-bold text-dark">91%</span>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-medium" style={{ fontSize: '0.85rem' }}>Workflow Coverage</span>
              <span className="text-primary fw-bold" style={{ fontSize: '0.85rem' }}>91%</span>
            </div>
            <div className="progress" style={{ height: '6px', borderRadius: '4px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '91%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
        

        <div className="position-absolute bg-white rounded-pill shadow border px-3 py-2 d-flex align-items-center gap-2" style={{ bottom: '15px', left: '-30px', zIndex: 2 }}>
          <CheckSquare size={16} color="#2563EB" />
          <span className="fw-bold text-dark small">3 workflows live</span>
        </div>
      </div>
    );
  }

  if (stepId === 3) {
    return (
      <div className="position-relative d-inline-block text-start w-100 mt-4" style={{ maxWidth: '400px' }}>
        <div className="rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="d-flex align-items-center mb-4 gap-3">
            <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
              <Activity size={24} color="#2563EB" />
            </div>
            <div>
              <h5 className="m-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>Workforce Analytics</h5>
              <div className="text-muted small">Live Dashboard · June 2026</div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Attendance Rate</span>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark">96.2%</span>
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 20, height: 20 }}>
                <ArrowUp size={12} strokeWidth={3} color="#10B981" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Compliance Score</span>
            <span className="fw-bold text-dark">99%</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
            <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Engagement Index</span>
            <span className="fw-bold text-dark">8.4 / 10</span>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-medium" style={{ fontSize: '0.85rem' }}>Overall Health</span>
              <span className="text-primary fw-bold" style={{ fontSize: '0.85rem' }}>96%</span>
            </div>
            <div className="progress" style={{ height: '6px', borderRadius: '4px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '96%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
        
   
        <div className="position-absolute bg-white rounded-pill shadow border px-3 py-2 d-flex align-items-center gap-2" style={{ top: '-15px', right: '-10px', zIndex: 2 }}>
          <TrendingUp size={16} color="#2563EB" />
          <span className="fw-bold text-dark small">+18% this month</span>
        </div>
      </div>
    );
  }

  return null;
};
