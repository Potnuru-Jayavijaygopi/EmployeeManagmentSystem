import React, { useState, useEffect } from 'react';

import Button from '../../components/common/Button';
import { 
  CheckCircle2, Send, DollarSign, XCircle, Search, Download, 
  Eye, Check, X, FileText, FileImage, FileCode2,
  Utensils, Plane, Users, Phone, Building2, PenTool
} from 'lucide-react';
import './AdminExpenses.css';
import { expensesClaims as initialExpensesClaims, expenseCategories } from '../../data/adminExpensesData';
import AdminClaimDetails from './AdminClaimDetails';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import { expenseService, withFallback } from '../../services';

const AdminExpenses = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [adminClaims, setAdminClaims] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const claimsData = await expenseService.getClaims();
        const rawClaims = Array.isArray(claimsData) ? claimsData : (claimsData?.results && Array.isArray(claimsData.results)) ? claimsData.results : [];
        setAdminClaims(rawClaims);
      } catch (err) {
        setAdminClaims([]);
      }

      try {
        const catData = await expenseService.getCategories();
        const rawCats = Array.isArray(catData) ? catData : (catData?.results && Array.isArray(catData.results)) ? catData.results : [];
        setCategories(rawCats);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  const normalizeStatus = (status) => {
    if (!status) return 'Submitted';
    const str = String(status).toUpperCase();
    if (str === 'SUBMITTED') return 'Submitted';
    if (str === 'UNDER_REVIEW') return 'Under Review';
    if (str === 'APPROVED') return 'Approved';
    if (str === 'REJECTED') return 'Rejected';
    if (str === 'REIMBURSED') return 'Reimbursed';
    if (str === 'DRAFT') return 'Draft';
    return status;
  };

  const totalClaimsCount = adminClaims.length;
  const approvedCount = adminClaims.filter(c => normalizeStatus(c.status) === 'Approved').length;
  const pendingReviewCount = adminClaims.filter(c => ['Under Review', 'Submitted', 'Draft'].includes(normalizeStatus(c.status))).length;
  const reimbursedCount = adminClaims.filter(c => normalizeStatus(c.status) === 'Reimbursed').length;
  const reimbursedTotalAmount = adminClaims
    .filter(c => normalizeStatus(c.status) === 'Reimbursed')
    .reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const rejectedCount = adminClaims.filter(c => normalizeStatus(c.status) === 'Rejected').length;

  const filteredClaims = adminClaims.filter(claim => {
    const normStatus = normalizeStatus(claim.status);
    if (activeTab !== 'All' && normStatus !== activeTab) {
      return false;
    }
    const empName = claim.employee_name || claim.name || '';
    if (searchQuery && !empName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusPillClass = (status) => {
    const norm = normalizeStatus(status);
    switch(norm) {
      case 'Submitted': return 'submitted';
      case 'Under Review': return 'under-review';
      case 'Approved': return 'approved';
      case 'Rejected': return 'rejected';
      case 'Reimbursed': return 'reimbursed';
      default: return '';
    }
  };

  const getStatusDotColor = (status) => {
    const norm = normalizeStatus(status);
    switch(norm) {
      case 'Submitted': return '#3b82f6';
      case 'Under Review': return '#f97316';
      case 'Approved': return '#16a34a';
      case 'Rejected': return '#ef4444';
      case 'Reimbursed': return '#8b5cf6';
      default: return 'transparent';
    }
  };

  const renderReceiptIcon = (type) => {
    if (type === 'PDF') return <div className="d-flex align-items-center gap-1 text-muted small border rounded px-2 py-1"><FileText size={12} /> PDF</div>;
    if (type === 'JPG') return <div className="d-flex align-items-center gap-1 text-muted small border rounded px-2 py-1"><FileImage size={12} /> JPG</div>;
    return <span className="text-muted">-</span>;
  };

  const renderCategoryIcon = (iconType) => {
    const typeStr = String(iconType || '').toLowerCase();
    if (typeStr.includes('food') || typeStr.includes('meal')) return <Utensils size={20} />;
    if (typeStr.includes('travel')) return <Plane size={20} />;
    if (typeStr.includes('client') || typeStr.includes('entertainment')) return <Users size={20} />;
    if (typeStr.includes('comm') || typeStr.includes('phone')) return <Phone size={20} />;
    if (typeStr.includes('hotel') || typeStr.includes('accommodation')) return <Building2 size={20} />;
    if (typeStr.includes('office') || typeStr.includes('supplies')) return <PenTool size={20} />;
    return <Utensils size={20} />;
  };

  if (selectedClaim) {
    return <AdminClaimDetails claim={selectedClaim} onBack={() => setSelectedClaim(null)} />;
  }

  return (
    <div className="admin-expenses-container px-4 py-3">
      <div className="mb-4">
        <Breadcrumb items={['Dashboard', 'Expenses']} />
        <h3 className="fw-bold mt-2 mb-1">My Expenses & Reimbursements</h3>
        <p className="text-muted small">Submit, track and manage your expense claims</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border success"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">TOTAL CLAIMS</h6>
              <div className="summary-card-icon success">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="summary-card-value">{totalClaimsCount}</div>
            <div className="summary-card-subtitle success">{approvedCount} Approved, {pendingReviewCount} Pending</div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border warning"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">PENDING REVIEW</h6>
              <div className="summary-card-icon warning">
                <Send size={16} />
              </div>
            </div>
            <div className="summary-card-value">{pendingReviewCount}</div>
            <div className="summary-card-subtitle warning">Under review</div>
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
            <div className="summary-card-value">{reimbursedCount}</div>
            <div className="summary-card-subtitle muted">₹{reimbursedTotalAmount.toLocaleString('en-IN')} total</div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="summary-card">
            <div className="summary-card-top-border danger"></div>
            <div className="summary-card-header">
              <h6 className="summary-card-title">REJECTED</h6>
              <div className="summary-card-icon danger">
                <XCircle size={16} />
              </div>
            </div>
            <div className="summary-card-value">{rejectedCount}</div>
            <div className="summary-card-subtitle danger">Needs review</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3 border shadow-sm mb-4 overflow-hidden">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <h5 className="m-0 fw-bold">All Expenses Claim</h5>
            <span className="badge bg-light text-secondary rounded-pill border">{filteredClaims.length}</span>
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
            <Button variant="outline" className="btn btn-sm btn-white border d-flex align-items-center gap-2">
              <Download size={14} />
              Export
            </Button>
          </div>
        </div>

        <div className="px-3 pt-2">
          <div className="expenses-tabs">
            {['All', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Reimbursed'].map(tab => (
              <div 
                key={tab}
                className={`expenses-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small fw-semibold text-uppercase px-4 py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>EMPLOYEE</th>
                <th className="text-muted small fw-semibold text-uppercase py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>AMOUNT</th>
                <th className="text-muted small fw-semibold text-uppercase py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>CATEGORY</th>
                <th className="text-muted small fw-semibold text-uppercase py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>DATE</th>
                <th className="text-muted small fw-semibold text-uppercase py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>DESCRIPTION</th>
                <th className="text-muted small fw-semibold text-uppercase py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>RECEIPT</th>
                <th className="text-muted small fw-semibold text-uppercase py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>STATUS</th>
                <th className="text-muted small fw-semibold text-uppercase px-4 py-3" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim) => {
                const normStatus = normalizeStatus(claim.status);
                const empName = claim.employee_name || claim.name || 'Employee';
                const initials = empName.split(' ').map(n => n[0]).join('').substring(0, 2);
                const amtFormatted = claim.amount ? `₹${Number(claim.amount).toLocaleString('en-IN')}` : '₹0.00';

                return (
                  <tr key={claim.id}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm rounded-circle d-flex justify-content-center align-items-center text-white me-2 bg-primary" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                          {initials}
                        </div>
                        <div>
                          <h6 className="m-0 fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{empName}</h6>
                          <p className="m-0 text-muted" style={{ fontSize: '0.7rem' }}>{claim.employee_id || claim.claim_number || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="fw-bold text-dark py-3" style={{ fontSize: '0.85rem' }}>{amtFormatted}</td>
                    <td className="py-3">
                      <span className="badge bg-light text-dark border px-2 py-1 fw-medium" style={{ fontSize: '0.75rem' }}>{claim.category_name || claim.category || 'General'}</span>
                    </td>
                    <td className="text-muted py-3" style={{ fontSize: '0.8rem' }}>{claim.expense_date || claim.date || ''}</td>
                    <td className="text-muted py-3" style={{ fontSize: '0.8rem', maxWidth: '200px' }}>
                      <div className="text-truncate">{claim.title || claim.desc || claim.description || ''}</div>
                    </td>
                    <td className="py-3">
                      {renderReceiptIcon(claim.receiptType || (claim.requires_receipt ? 'PDF' : '-'))}
                    </td>
                    <td className="py-3">
                      <div className={`status-pill ${getStatusPillClass(normStatus)}`}>
                        <span style={{ color: getStatusDotColor(normStatus), fontSize: '1.2rem', lineHeight: '0' }}>•</span>
                        {normStatus}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="d-flex gap-2">
                        <Button variant="icon" className="btn btn-sm btn-light border p-1 rounded text-blue bg-white" onClick={() => setSelectedClaim(claim)}>
                          <Eye size={14} />
                        </Button>
                        <Button variant="icon" className="btn btn-sm btn-light border p-1 rounded text-success bg-white" disabled={['Approved', 'Rejected', 'Reimbursed'].includes(normStatus)}>
                          <Check size={14} />
                        </Button>
                        <Button variant="icon" className="btn btn-sm btn-light border p-1 rounded text-danger bg-white" disabled={['Rejected', 'Reimbursed'].includes(normStatus)}>
                          <X size={14} />
                        </Button>
                        <Button variant="icon" className="btn btn-sm btn-light border p-1 rounded text-purple bg-white" disabled={normStatus !== 'Approved'}>
                          <FileCode2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredClaims.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No expense claims found for the selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center p-3 border-top bg-white">
          <span className="text-muted small">Showing 1–{filteredClaims.length} of {adminClaims.length} claims</span>
          <div className="d-flex gap-1">
            <Button variant="outline" className="btn btn-sm btn-white border px-2 text-muted disabled">‹</Button>
            <Button variant="primary" className="btn btn-sm btn-primary bg-blue border-0 px-3">1</Button>
            <Button variant="outline" className="btn btn-sm btn-white border px-2 text-muted">›</Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3 border shadow-sm p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h5 className="m-0 fw-bold">Expense Categories</h5>
          <span className="badge bg-light text-secondary rounded-pill border">{categories.length}</span>
        </div>

        <div className="row g-4">
          {categories.map(cat => {
            const maxAmtDisplay = cat.max_amount ? `₹${Number(cat.max_amount).toLocaleString('en-IN')}` : 'No Limit';
            const catTag = cat.category_type_display || cat.category_type || 'General';

            return (
              <div key={cat.id} className="col-12 col-md-6 col-lg-4">
                <div className="category-card">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="category-icon-box food">
                      {renderCategoryIcon(cat.category_type || cat.name)}
                    </div>
                    <h6 className="m-0 fw-bold text-dark">{cat.name}</h6>
                  </div>

                  <div className="d-flex gap-3 mb-4">
                    <div className="category-info-box">
                      <div className="category-info-label">BUDGET LIMIT</div>
                      <div className="category-info-value">{maxAmtDisplay}</div>
                    </div>
                    <div className="category-info-box">
                      <div className="category-info-label">CATEGORY</div>
                      <div className="category-info-value">{catTag}</div>
                    </div>
                  </div>

                  <div>
                    <div className="category-req-label">REQUIREMENTS</div>
                    <div className="d-flex gap-2">
                      <div className="pill-badge outline-primary">
                        Receipts : {cat.requires_receipt ? 'Yes' : 'No'}
                      </div>
                      <div className="pill-badge outline-success">
                        Approval : {cat.approval_required ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {categories.length === 0 && (
            <div className="col-12 text-center py-4 text-muted">
              No expense categories available in database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminExpenses;
