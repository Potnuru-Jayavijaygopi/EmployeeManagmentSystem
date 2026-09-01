import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { 
  Send, Check, X, DollarSign, Search, MoreVertical, 
  ChevronLeft, ChevronRight, Utensils, Plane, Users, 
  Smartphone, Building2, PenTool, CheckCircle2,
  UploadCloud, FileText, Download, Calendar, Eye
} from 'lucide-react';
import '../Expenses/AdminExpenses.css'; 
import { expenseService, withFallback } from '../../services';

const initialClaims = [
  { id: 1, title: 'Travelwl', category: 'Travel Expenses', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Approved' },
  { id: 2, title: 'sdf 2', category: 'Communication', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Draft' },
  { id: 3, title: 'Travel', category: 'Travel Expenses', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Approved' },
  { id: 4, title: 'sdf 2', category: 'Communication', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Draft' },
  { id: 5, title: 'sdf 2', category: 'Communication', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Draft' },
  { id: 6, title: 'Personal Meals', category: 'Food & Meals', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Rejected' },
  { id: 7, title: 'Hotel Stay – Pune', category: 'Hotel & Accommodation', amount: '₹1,000.00', date: '01 Jan 2026', status: 'Reimbursed' },
];

const initialCategories = [
  { id: 'food', title: 'Food & Meals', icon: Utensils, iconClass: 'food', max: '₹1,000.00', type: 'Food', receipts: true, approval: true },
  { id: 'travel', title: 'Travel Expenses', icon: Plane, iconClass: 'travel', max: '₹5,000.00', type: 'Travel', receipts: false, approval: true },
  { id: 'client', title: 'Client Entertainment', icon: Users, iconClass: 'client', max: '₹2,000.00', type: 'Client Ent.', receipts: false, approval: true },
  { id: 'comm', title: 'Communication', icon: Smartphone, iconClass: 'communication', max: '₹500.00', type: 'Comms', receipts: true, approval: true },
  { id: 'hotel', title: 'Hotel & Accommodation', icon: Building2, iconClass: 'hotel', max: '₹8,000.00', type: 'Hotel', receipts: true, approval: true },
  { id: 'office', title: 'Office Supplies', icon: PenTool, iconClass: 'office', max: '₹1,500.00', type: 'Office', receipts: true, approval: true },
];

import AdminClaimDetails from './AdminClaimDetails';

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalType, setModalType] = useState(null); 
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claims, setClaims] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const claimsData = await expenseService.getClaims();
        const rawClaims = Array.isArray(claimsData) ? claimsData : (claimsData?.results && Array.isArray(claimsData.results)) ? claimsData.results : [];
        setClaims(rawClaims);
      } catch (err) {
        setClaims([]);
      }

      try {
        const catData = await expenseService.getCategories();
        const rawCats = Array.isArray(catData) ? catData : (catData?.results && Array.isArray(catData.results)) ? catData.results : [];
        setCategories(rawCats);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchExpenses();
  }, []);

  const myClaims = claims;
  const expenseCategories = categories;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'success';
      case 'Draft': return 'secondary';
      case 'Rejected': return 'danger';
      case 'Reimbursed': return 'primary';
      default: return 'secondary';
    }
  };

  const renderStatusPill = (status) => {
    const color = getStatusColor(status);
    let dotColor = '#6c757d'; 
    let bgColor = 'bg-light';
    let textColor = 'text-secondary';

    if (color === 'success') { dotColor = '#16a34a'; bgColor = 'bg-success-light'; textColor = 'text-success'; }
    if (color === 'danger') { dotColor = '#ef4444'; bgColor = 'bg-danger-light'; textColor = 'text-danger'; }
    if (color === 'primary') { dotColor = '#3b82f6'; bgColor = 'bg-blue-light'; textColor = 'text-blue'; }

    return (
      <span className={`badge rounded-pill ${bgColor} ${textColor} border d-inline-flex align-items-center gap-2 px-3 py-1 fw-medium`}>
        <div className="rounded-circle" style={{ width: 6, height: 6, backgroundColor: dotColor }}></div>
        {status}
      </span>
    );
  };

  const renderModal = () => {
    if (!modalType) return null;

    if (modalType === 'new') {
      return (
        <Modal isOpen={true} onClose={() => setModalType(null)}>
          <div className="bg-white rounded-3 shadow-lg w-100" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h5 className="m-0 fw-bold text-dark">New Claim</h5>
                <div className="text-muted small">Fill in the details of your expense</div>
              </div>
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType(null)}>
                <X size={20} className="text-muted" />
              </Button>
            </div>

            <div className="p-4">
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Title <span className="text-blue">*</span></label>
                  <input type="text" className="form-control text-muted" placeholder="e.g. Client dinner" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Category <span className="text-blue">*</span></label>
                  <select className="form-select text-muted">
                    <option>— choose category —</option>
                    <option>Food & Meals</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Expense Date <span className="text-blue">*</span></label>
                  <div className="position-relative">
                    <input type="text" className="form-control text-muted pe-4" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="position-absolute text-dark" style={{ right: '10px', top: '10px' }} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Amount (₹) <span className="text-blue">*</span></label>
                  <input type="text" className="form-control text-muted" placeholder="0.00" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Notes</label>
                  <input type="text" className="form-control text-muted" placeholder="Optional notes" />
                </div>
              </div>

              <div>
                <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Receipts</label>
                <div className="border rounded p-4 text-center">
                  <div className="text-muted small mb-3">No receipts attached.</div>
                  <Button variant="outline" className="btn btn-sm text-blue border-blue bg-blue-light px-3 py-1 fw-medium" onClick={() => setModalType('upload')}>Upload Receipts</Button>
                </div>
              </div>
            </div>

            <div className="p-4 border-top d-flex justify-content-end gap-2">
              <Button variant="secondary" className="btn btn-white border fw-semibold px-4" onClick={() => setModalType(null)}>Close</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4" onClick={() => setModalType(null)}>Save</Button>
            </div>
          </div>
        </Modal>
      );
    }

    if (modalType === 'edit') {
      return (
        <Modal isOpen={true} onClose={() => setModalType(null)}>
          <div className="bg-white rounded-3 shadow-lg w-100" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h5 className="m-0 fw-bold text-dark">Edit Claim</h5>
                <div className="text-muted small">Fill in the details of your expense</div>
              </div>
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType(null)}>
                <X size={20} className="text-muted" />
              </Button>
            </div>

            <div className="p-4">
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Title <span className="text-blue">*</span></label>
                  <input type="text" className="form-control text-dark" defaultValue="Client Dinner" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Category <span className="text-blue">*</span></label>
                  <select className="form-select text-dark">
                    <option>— choose category —</option>
                    <option>Food & Meals</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Expense Date <span className="text-blue">*</span></label>
                  <div className="position-relative">
                    <input type="text" className="form-control text-dark pe-4" defaultValue="09 - 04 - 2026" />
                    <Calendar size={14} className="position-absolute text-dark" style={{ right: '10px', top: '10px' }} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Amount (₹) <span className="text-blue">*</span></label>
                  <input type="text" className="form-control text-dark" defaultValue="887.00" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Notes</label>
                  <input type="text" className="form-control text-muted" placeholder="Optional notes" />
                </div>
              </div>

              <div>
                <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Receipts</label>
                <div className="border rounded p-4 text-center">
                  <div className="text-muted small mb-3">No receipts attached.</div>
                  <Button variant="outline" className="btn btn-sm text-blue border-blue bg-blue-light px-3 py-1 fw-medium" onClick={() => setModalType('upload')}>Upload Receipts</Button>
                </div>
              </div>
            </div>

            <div className="p-4 border-top d-flex justify-content-end gap-2">
              <Button variant="secondary" className="btn btn-white border fw-semibold px-4" onClick={() => setModalType(null)}>Close</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4" onClick={() => setModalType(null)}>Update</Button>
            </div>
          </div>
        </Modal>
      );
    }

    if (modalType === 'upload') {
      return (
        <Modal isOpen={true} onClose={() => setModalType(null)}>
          <div className="bg-white rounded-3 shadow-lg w-100" style={{ maxWidth: '450px' }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h5 className="m-0 fw-bold text-dark">Upload Receipt</h5>
                <div className="text-muted small">Attach a file to this claim</div>
              </div>
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType('edit')}>
                <X size={20} className="text-muted" />
              </Button>
            </div>

            <div className="p-4">
              <div 
                className="border rounded mb-4 d-flex flex-column align-items-center justify-content-center bg-light"
                style={{ height: '140px', borderStyle: 'dashed !important', cursor: 'pointer' }}
                onClick={() => setIsFileSelected(!isFileSelected)}
              >
                {!isFileSelected ? (
                  <>
                    <div className="bg-blue-light text-blue rounded p-2 mb-2">
                      <UploadCloud size={20} />
                    </div>
                    <div className="fw-bold text-dark small">Drop file here or click to browse</div>
                    <div className="text-muted small" style={{fontSize: '0.7rem'}}>PDF, JPG or PNG • Max 10MB</div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-light text-blue rounded p-2 mb-2">
                      <UploadCloud size={20} />
                    </div>
                    <div className="fw-bold text-dark small">Drop file here or click to browse</div>
                    <div className="text-muted small mb-2" style={{fontSize: '0.7rem'}}>PDF, JPG or PNG • Max 10MB</div>
                    <div className="badge bg-white text-dark border d-flex align-items-center gap-2 px-3 py-1">
                      <FileText size={12} className="text-muted" />
                      <span className="small">receipt_sdf2_may2024.pdf</span>
                      <span className="text-muted" style={{fontSize: '0.65rem'}}>2.4 MB</span>
                      <X size={12} className="text-muted ms-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsFileSelected(false); }} />
                    </div>
                  </>
                )}
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Amount (Optional)</label>
                  <input type="text" className="form-control text-muted" placeholder="Receipt amount" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Receipt Date (Optional)</label>
                  <div className="position-relative">
                    <input type="text" className="form-control text-muted pe-4" placeholder="dd - mm - yyyy" />
                    <Calendar size={14} className="position-absolute text-dark" style={{ right: '10px', top: '10px' }} />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Vendor Name</label>
                  <input type="text" className="form-control text-muted" placeholder="e.g. Swiggy, MakeMyTrip" />
                </div>
                <div className="col-12">
                  <label className="form-label text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Receipt Number</label>
                  <input type="text" className="form-control text-muted" placeholder="e.g. RCP-2024-001" />
                </div>
              </div>
            </div>

            <div className="p-4 border-top d-flex justify-content-end gap-2">
              <Button variant="secondary" className="btn btn-white border fw-semibold px-4" onClick={() => setModalType('edit')}>Close</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4" onClick={() => setModalType('edit')}>Upload</Button>
            </div>
          </div>
        </Modal>
      );
    }

    if (modalType === 'receipts' || modalType === 'receipts_empty') {
      return (
        <Modal isOpen={true} onClose={() => setModalType(null)}>
          <div className="bg-white rounded-3 shadow-lg w-100" style={{ maxWidth: '450px' }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <div>
                <h5 className="m-0 fw-bold text-dark">Receipts</h5>
                <div className="text-muted small">Client Meeting - Mumbai - ₹2,800.00</div>
              </div>
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType(null)}>
                <X size={20} className="text-muted" />
              </Button>
            </div>

            <div className="p-4 bg-light">
              {modalType === 'receipts_empty' ? (
                <div className="bg-white border rounded p-4 text-center">
                  <div className="text-muted small">No receipts attached to this claim.</div>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white border rounded p-3 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-blue-light text-blue rounded p-2 d-flex align-items-center justify-content-center">
                          <FileText size={16} />
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">client-dinner.jpg</div>
                          <div className="text-muted" style={{fontSize: '0.65rem'}}>Taj Hotels • ₹2,800.00</div>
                        </div>
                      </div>
                      <Button variant="outline" className="btn btn-sm btn-white border text-blue rounded px-2 py-1">
                        <Download size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-top d-flex justify-content-end">
              <Button variant="secondary" className="btn btn-white border fw-semibold px-4" onClick={() => setModalType(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      );
    }

    if (modalType === 'history') {
      return (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1050, transition: 'opacity 0.3s' }}
          onClick={() => setModalType(null)}
        >
          <div 
            className="position-absolute top-0 end-0 h-100 bg-white shadow-lg overflow-auto" 
            style={{ width: '400px', transition: 'transform 0.3s', transform: 'translateX(0)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
              <h5 className="m-0 fw-bold text-dark">Travel — History</h5>
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType(null)}>
                <X size={20} className="text-muted" />
              </Button>
            </div>

            <div className="p-4">

              <div className="bg-blue-light rounded-3 p-4 mb-4">
                <div className="text-muted small fw-bold mb-3" style={{ fontSize: '0.7rem' }}>Claim Summary</div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Amount</div>
                    <div className="fw-bold text-dark" style={{ fontSize: '1rem' }}>₹0.10</div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Category</div>
                    <div className="fw-bold text-dark small">Travel Expenses</div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Date</div>
                    <div className="text-dark small">01 Jan 2026</div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Status</div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle" style={{ width: 6, height: 6, backgroundColor: '#6c757d' }}></div>
                      <span className="text-muted small fw-medium">Draft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-muted small fw-bold text-uppercase mb-3" style={{ fontSize: '0.65rem' }}>Timeline</div>

              <div className="position-relative">

                <div className="position-absolute" style={{ left: '6px', top: '10px', bottom: '0', width: '2px', backgroundColor: '#e9ecef' }}></div>

                <div className="position-relative ps-4 mb-4">
                  <div className="position-absolute rounded-circle border border-white" style={{ left: '0', top: '2px', width: '14px', height: '14px', backgroundColor: '#9ca3af', borderStyle: 'solid', borderWidth: '2px' }}></div>
                  <div className="fw-medium text-dark small">Claim created (Draft)</div>
                  <div className="text-muted mt-1" style={{ fontSize: '0.7rem' }}>Nov 1, 2025 · 10:24 AM</div>
                </div>

                <div className="position-relative ps-4 mb-4">
                  <div className="position-absolute rounded-circle border border-white" style={{ left: '0', top: '2px', width: '14px', height: '14px', backgroundColor: '#f97316', borderStyle: 'solid', borderWidth: '2px' }}></div>
                  <div className="fw-medium text-dark small">Submitted for approval</div>
                  <div className="text-muted mt-1 mb-2" style={{ fontSize: '0.7rem' }}>Nov 2, 2025 · 9:00 AM</div>
                  <div className="bg-light rounded p-2 text-muted small" style={{ fontSize: '0.75rem' }}>
                    Sent to Moon
                  </div>
                </div>

                <div className="position-relative ps-4">
                  <div className="position-absolute rounded-circle border border-white" style={{ left: '0', top: '2px', width: '14px', height: '14px', backgroundColor: '#86efac', borderStyle: 'solid', borderWidth: '2px' }}></div>
                  <div className="fw-medium text-dark small">Approved by manager</div>
                  <div className="text-muted mt-1 mb-2" style={{ fontSize: '0.7rem' }}>Nov 3, 2025 · 11:15 AM</div>
                  <div className="bg-light rounded p-2 text-muted small" style={{ fontSize: '0.75rem' }}>
                    Approved by Moon — looks good!
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (selectedClaim) {
    return <AdminClaimDetails claim={selectedClaim} onBack={() => setSelectedClaim(null)} />;
  }

  return (
    <div className="dashboard-container">
      {renderModal()}

      <div className="mb-4">
        <Breadcrumb items={['Dashboard', 'Expenses']} />
        <h1 className="page-title m-0">My Expenses & Reimbursements</h1>
        <p className="text-muted small m-0 mt-1">Submit, track and manage your expense claims</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border warning"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">SUBMITTED</h6>
              <div className="summary-card-icon warning">
                <Send size={16} />
              </div>
            </div>
            <div className="summary-card-value text-warning-dark">1</div>
            <div className="summary-card-subtitle warning">Awaiting review</div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border success"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">APPROVED</h6>
              <div className="summary-card-icon success">
                <Check size={16} />
              </div>
            </div>
            <div className="summary-card-value text-success">3</div>
            <div className="summary-card-subtitle success">Claims approved</div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border danger"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">REJECTED</h6>
              <div className="summary-card-icon danger">
                <X size={16} />
              </div>
            </div>
            <div className="summary-card-value text-danger">1</div>
            <div className="summary-card-subtitle danger">Needs review</div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border primary"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">REIMBURSED</h6>
              <div className="summary-card-icon primary">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="summary-card-value text-blue">2</div>
            <div className="summary-card-subtitle muted">₹6,000.00 total</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded border shadow-sm overflow-hidden mb-4">
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <h5 className="m-0 fw-bold">My Claims</h5>
            <span className="badge bg-light text-secondary rounded-pill border">8</span>
          </div>
          <div className="d-flex gap-3">
            <div className="position-relative">
              <Search size={16} className="position-absolute text-muted" style={{ top: '10px', left: '12px' }} />
              <input 
                type="text" 
                className="form-control form-control-sm ps-5 bg-light border-0" 
                placeholder="Search claims..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '0.4rem 1rem' }}
              />
            </div>
            <select className="form-select form-select-sm border bg-white" style={{ width: '120px' }}>
              <option>All Status</option>
              <option>Approved</option>
              <option>Draft</option>
              <option>Rejected</option>
              <option>Reimbursed</option>
            </select>
            <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 py-1 fw-semibold shadow-sm" onClick={() => setModalType('new')}>+ New Claim</Button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small fw-bold py-3 px-4 border-0 text-uppercase">Title</th>
                <th className="text-muted small fw-bold py-3 px-3 border-0 text-uppercase">Category</th>
                <th className="text-muted small fw-bold py-3 px-3 border-0 text-uppercase">Amount</th>
                <th className="text-muted small fw-bold py-3 px-3 border-0 text-uppercase">Date</th>
                <th className="text-muted small fw-bold py-3 px-3 border-0 text-uppercase">Status</th>
                <th className="text-muted small fw-bold py-3 px-4 border-0 text-uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myClaims.map((claim, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 fw-medium text-dark">{claim.title}</td>
                  <td className="px-3 py-3 text-muted small">{claim.category}</td>
                  <td className="px-3 py-3 fw-bold text-dark">{claim.amount}</td>
                  <td className="px-3 py-3 text-muted small">{claim.date}</td>
                  <td className="px-3 py-3">
                    {renderStatusPill(claim.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-2">
                      <Button variant="icon" className="btn btn-sm btn-light border p-1 rounded text-blue bg-white" title="View Details" onClick={() => setSelectedClaim(claim)}>
                        <Eye size={14} />
                      </Button>
                      {claim.status === 'Draft' ? (
                        <>
                          <Button variant="outline" className="btn btn-sm text-warning-dark border-warning bg-warning-light px-3 py-1 fw-medium" style={{fontSize: '0.75rem'}} onClick={() => setModalType('edit')}>Edit</Button>
                          <Button className="btn btn-sm bg-success text-white border-0 px-3 py-1 fw-medium" style={{fontSize: '0.75rem'}}>Submit</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" className="btn btn-sm text-blue border-blue bg-blue-light px-3 py-1 fw-medium" style={{fontSize: '0.75rem'}} onClick={() => claim.status === 'Rejected' ? setModalType('receipts_empty') : setModalType('receipts')}>Receipts</Button>
                          <Button variant="outline" className="btn btn-sm text-purple border-purple bg-purple-light px-3 py-1 fw-medium" style={{fontSize: '0.75rem'}} onClick={() => setModalType('history')}>History</Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <div className="text-muted small">Showing 1–7 of 8 claims</div>
          <div className="d-flex gap-1">
            <Button variant="icon" className="btn btn-sm btn-light border px-2 py-1 text-muted"><ChevronLeft size={16}/></Button>
            <Button className="btn btn-sm btn-primary bg-blue border-0 px-3 py-1 fw-medium">1</Button>
            <Button variant="secondary" className="btn btn-sm btn-light border px-3 py-1 text-muted">2</Button>
            <Button variant="icon" className="btn btn-sm btn-light border px-2 py-1 text-muted"><ChevronRight size={16}/></Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded border shadow-sm p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h5 className="m-0 fw-bold">Expense Categories</h5>
          <span className="badge bg-light text-secondary rounded-pill border">6</span>
        </div>

        <div className="row g-4">
          {expenseCategories.map((cat, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="border rounded p-4 h-100 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className={`category-icon-box m-0 ${cat.iconClass}`}>
                    <cat.icon size={20} />
                  </div>
                  <h6 className="fw-bold m-0">{cat.title}</h6>
                </div>

                <div className="row g-0 mb-4">
                  <div className="col-6">
                    <div className="text-muted small fw-bold" style={{ fontSize: '0.65rem' }}>BUDGET LIMIT</div>
                    <div className="fw-bold text-dark mt-1">{cat.max}</div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small fw-bold" style={{ fontSize: '0.65rem' }}>CATEGORY</div>
                    <div className="fw-bold text-dark mt-1">{cat.type}</div>
                  </div>
                </div>

                <div>
                  <div className="text-muted small fw-bold mb-2" style={{ fontSize: '0.65rem' }}>REQUIREMENTS</div>
                  <div className="d-flex gap-2">
                    <span className="badge rounded-pill bg-blue-light text-blue border border-blue px-3 py-1 fw-medium" style={{fontSize: '0.75rem'}}>
                      Receipts : {cat.receipts ? 'Yes' : 'No'}
                    </span>
                    <span className="badge rounded-pill bg-success-light text-success border border-success px-3 py-1 fw-medium" style={{fontSize: '0.75rem'}}>
                      Approval : {cat.approval ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
