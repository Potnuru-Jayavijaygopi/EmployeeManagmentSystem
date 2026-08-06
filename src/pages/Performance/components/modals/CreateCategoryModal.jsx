import React, { useState } from 'react';
import { X, Folder, ChevronDown } from 'lucide-react';
import Button from '../../../../components/common/Button';

const colors = [
  '#EF4444', 
  '#F97316', 
  '#10B981', 
  '#3B82F6', 
  '#8B5CF6', 
  '#14B8A6', 
  '#EC4899', 
  '#EF4444', 
];

const CreateCategoryModal = ({ isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [isActive, setIsActive] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg animate-modal-in d-flex flex-column" style={{ width: '100%', maxWidth: '450px', maxHeight: '90vh', overflow: 'hidden' }}>

        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: '#F3E8FF', color: '#9333EA' }}>
              <Folder size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>Create Category</h5>
              <p className="text-muted small mb-0" style={{ fontSize: '0.75rem' }}>Create a new category</p>
            </div>
          </div>
          <Button variant="icon" onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex border-0 text-muted" style={{ backgroundColor: '#F9FAFB' }}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>

          <div className="mb-4">
            <label className="form-label text-dark fw-bold mb-2" style={{ fontSize: '0.875rem' }}>Category Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control border-danger" placeholder="e.g. Product Design" />
            <div className="text-danger mt-2 d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              Category name is required
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label text-dark fw-bold mb-0" style={{ fontSize: '0.875rem' }}>Description</label>
              <span className="text-muted" style={{ fontSize: '0.75rem' }}>(Optional)</span>
            </div>
            <textarea className="form-control" rows="3" placeholder="Briefly describe the purpose of this category..."></textarea>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label text-dark fw-bold mb-0" style={{ fontSize: '0.875rem' }}>Color Theme</label>
              <span className="text-muted" style={{ fontSize: '0.75rem' }}>Live preview</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                {colors.map((color, i) => (
                  <div 
                    key={i} 
                    className="rounded-circle cursor-pointer" 
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: color,
                      border: selectedColor === color ? '2px solid white' : 'none',
                      boxShadow: selectedColor === color ? `0 0 0 2px ${color}` : 'none'
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
              <div className="d-flex align-items-center gap-2 bg-light px-3 py-1 rounded" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                <div className="rounded-sm" style={{ width: '8px', height: '8px', backgroundColor: selectedColor }}></div>
                New Category
              </div>
            </div>
          </div>

          <div className="mb-4 border-bottom pb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label text-dark fw-bold mb-0" style={{ fontSize: '0.875rem' }}>Owner</label>
              <span className="text-muted" style={{ fontSize: '0.75rem' }}>(Optional)</span>
            </div>
            <div className="position-relative cursor-pointer">
              <div className="form-control d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-secondary bg-opacity-25" style={{ width: '20px', height: '20px' }}></div>
                  <span className="text-dark">Eleanor Rigby</span>
                </div>
                <ChevronDown size={16} className="text-muted" />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="text-dark fw-bold" style={{ fontSize: '0.875rem' }}>Status</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Make category active immediately</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>Active</span>
              <div 
                className={`rounded-pill cursor-pointer d-flex align-items-center px-1 ${isActive ? 'bg-primary' : 'bg-secondary bg-opacity-25'}`}
                style={{ width: '40px', height: '24px', transition: 'all 0.2s ease' }}
                onClick={() => setIsActive(!isActive)}
              >
                <div 
                  className="bg-white rounded-circle shadow-sm" 
                  style={{ width: '18px', height: '18px', transform: `translateX(${isActive ? '14px' : '0'})`, transition: 'all 0.2s ease' }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        <div className="p-4 border-top d-flex justify-content-end gap-2 bg-white">
          <Button variant="outline" type="button" onClick={onClose} className="btn-system btn-system-size-default btn-system-outline text-dark border-secondary">Cancel</Button>
          <Button type="button" className="btn-system btn-system-size-default btn-system-primary">Save Category</Button>
        </div>

      </div>
    </div>
  );
};

export default CreateCategoryModal;
