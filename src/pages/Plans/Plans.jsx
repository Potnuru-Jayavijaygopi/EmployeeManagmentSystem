import React, { useState } from 'react';
import { 
  CreditCard, FileText, Download, Check, X, 
  AlertTriangle, XCircle, Clock, ChevronLeft, ChevronRight, ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Plans.css';
import { invoices } from '../../data/plansConstants';
import Button from '../../components/common/Button';

const Plans = () => {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [modalType, setModalType] = useState(null); 
  const renderModal = () => {
    if (!modalType) return null;

    if (modalType === 'pricing') {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content pricing-modal-content p-0">
            <div className="d-flex justify-content-between align-items-center p-4">
              <div className="text-center w-100">
                <h3 className="m-0 fw-bold">Choose the right plan for your team</h3>
                <p className="text-slate mb-0 mt-1" style={{fontSize: '0.9rem'}}>All plans include a 14-day free trial. No credit card required. Upgrade or downgrade anytime.</p>
              </div>
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent position-absolute" style={{right: '24px', top: '24px'}} onClick={() => setModalType(null)}>
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="pricing-cards-container">

              <div className="pricing-card shadow-sm">
                <div className="pc-title">Base</div>
                <div className="pc-desc">Perfect for small teams — 10 Employees, Basic Tracking</div>
                <div className="pc-price">
                  <span className="currency">$</span> 19 <span className="period">/mo</span>
                </div>
                <div className="pc-limit">Up to 10 employees</div>

                <div className="pc-features">
                  <div className="pc-feature-item"><Check size={16} className="check" /> Attendance Tracking</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Basic Tracking</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Employee Management</div>
                </div>
                <Button variant="outline" className="pc-btn outline">Switch to BASE</Button>
              </div>

              <div className="pricing-card shadow-sm">
                <div className="pc-title">Pro</div>
                <div className="pc-desc">Complete HR solution — 50 Employees, Payroll & Leaves</div>
                <div className="pc-price">
                  <span className="currency">$</span> 49 <span className="period">/mo</span>
                </div>
                <div className="pc-limit">Up to 50 employees</div>

                <div className="pc-features">
                  <div className="pc-feature-item"><Check size={16} className="check" /> Leave Management</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Payroll Management</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Attendance Tracking</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Basic Tracking</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Employee Management</div>
                </div>
                <Button className="pc-btn primary" onClick={() => setModalType('confirm')}>Switch to PRO</Button>
              </div>

              <div className="pricing-card current">
                <div className="current-plan-badge"><Check size={12} strokeWidth={3} /> Current Plan</div>
                <div className="pc-title">Premium</div>
                <div className="pc-desc">Enterprise solution — Unlimited Employees, AI Analytics & Chat</div>
                <div className="pc-price">
                  <span className="currency">$</span> 99 <span className="period">/mo</span>
                </div>
                <div className="pc-limit">Unlimited employees</div>

                <div className="pc-features">
                  <div className="pc-feature-item"><Check size={16} className="check" /> Team Chat</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Leave Management</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Payroll Management</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Attendance Tracking</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> AI Analytics</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Basic Tracking</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Employee Management</div>
                  <div className="pc-feature-item"><Check size={16} className="check" /> Unlimited Employees</div>
                </div>
                <Button className="pc-btn current" onClick={() => setModalType(null)}><Check size={16} /> Current Plan</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === 'confirm') {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content text-center p-4" style={{maxWidth: '400px'}}>
            <div className="d-flex justify-content-end mb-2">
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType('pricing')}>
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="mb-4">
              <div className="bg-orange-light bg-opacity-50 text-orange p-3 rounded-circle d-inline-flex mb-3">
                <AlertTriangle size={32} />
              </div>
              <h3 className="fw-bold mb-3">Switch to Pro?</h3>
              <p className="text-slate" style={{fontSize: '0.9rem', lineHeight: 1.5}}>
                You are about to switch from <strong>Premium ($99/mo)</strong> to <strong>Pro ($49/mo)</strong>. 
                This change will take effect at the start of your next billing cycle. Some features may become unavailable.
              </p>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="secondary" className="btn btn-light border bg-white fw-semibold px-4 py-2 w-50" onClick={() => setModalType('pricing')}>Cancel</Button>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4 py-2 w-50" onClick={() => setModalType(null)}>Confirm Switch</Button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === 'cancel') {
      return (
        <div className="ms-modal-overlay">
          <div className="ms-modal-content text-center p-4" style={{maxWidth: '450px'}}>
            <div className="d-flex justify-content-end mb-2">
              <Button variant="icon" className="btn btn-light rounded-circle p-2 border-0 bg-transparent" onClick={() => setModalType(null)}>
                <X size={20} className="text-slate" />
              </Button>
            </div>

            <div className="mb-3">
              <div className="text-red p-2 rounded-circle border border-danger d-inline-flex mb-3">
                <X size={24} />
              </div>
              <h3 className="fw-bold mb-2">Cancel Enterprise Blueprint?</h3>
              <p className="text-slate" style={{fontSize: '0.85rem'}}>
                Your subscription will remain active until <strong>Oct 12, 2024</strong>. After this date, access to premium features will be restricted.
              </p>
            </div>

            <div className="bg-orange-light bg-opacity-10 border border-warning rounded-3 p-3 text-start mb-4 d-flex gap-2">
              <AlertTriangle size={16} className="text-orange flex-shrink-0 mt-1" />
              <div className="text-orange" style={{fontSize: '0.85rem'}}>
                You will lose access to <strong>Unlimited Ledgers, SSO, Priority Support</strong>, and all advanced features. 24 employees will be affected.
              </div>
            </div>

            <div className="text-start mb-4">
              <label className="form-label text-slate fw-semibold mb-2" style={{fontSize: '0.8rem'}}>Reason for cancellation (optional)</label>
              <input type="text" className="form-control border-slate" placeholder="Too expensive" />
            </div>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="secondary" className="btn btn-light border bg-white fw-semibold px-4 py-2 w-50" onClick={() => setModalType(null)}>Keep plan</Button>
              <Button variant="outline-destructive" className="btn btn-outline-danger fw-semibold px-4 py-2 w-50" onClick={() => setModalType(null)}>Confirm cancellation</Button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="plans-container fade-in p-4">

      <div className="plans-breadcrumb">
        <Link to="/admin/dashboard">Plans</Link> <ChevronRight size={14} className="mx-1" /> <span>Dashboard</span>
      </div>

      <div className="mb-4 pb-2">
        <h1 className="fw-bold m-0" style={{fontSize: '2rem'}}>Plans & Billing</h1>
        <p className="text-slate mt-2 mb-0">Manage your subscription plan. You are currently on the <strong>Premium</strong> plan.</p>
      </div>

      <div className="plans-kpi-grid">
        <div className="plans-kpi-card">
          <div className="kpi-title">CURRENT PLAN</div>
          <div className="kpi-value">Premium</div>
          <div className="kpi-subtext">Next cycle: Oct 12, 2024</div>
        </div>
        <div className="plans-kpi-card">
          <div className="kpi-title">THIS YEAR SPENT</div>
          <div className="kpi-value">$5,988.00</div>
          <div className="kpi-subtext">12 invoices paid</div>
        </div>
        <div className="plans-kpi-card">
          <div className="kpi-title">ACTIVE EMPLOYEE SEATS</div>
          <div className="kpi-value">Unlimited</div>
          <div className="kpi-subtext">No limit</div>
        </div>
        <div className="plans-kpi-card">
          <div className="kpi-title">STORAGE USED</div>
          <div className="kpi-value">75%</div>
          <div className="kpi-subtext">37.5 GB of 50 GB</div>
        </div>
      </div>

      <div className="plans-content-card">
        <div className="plans-tabs">
          <Button 
            className={`plans-tab ${activeTab === 'Subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('Subscription')}
          >
            <CreditCard size={18} /> Subscription
          </Button>
          <Button 
            className={`plans-tab ${activeTab === 'Payment Methods' ? 'active' : ''}`}
            onClick={() => setActiveTab('Payment Methods')}
          >
            <CreditCard size={18} /> Payment Methods
          </Button>
          <Button 
            className={`plans-tab ${activeTab === 'Invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('Invoices')}
          >
            <FileText size={18} /> Invoices
          </Button>
        </div>

        <div className="plans-panel">
          {activeTab === 'Invoices' && (
            <div className="fade-in">
              <div className="invoices-toolbar">
                <div className="invoices-search">
                  <input type="text" className="invoice-search-input" placeholder="Search invoices..." />
                  <select className="form-select border-slate bg-transparent" style={{width: '140px', fontSize: '0.85rem'}}>
                    <option>All status</option>
                  </select>
                  <select className="form-select border-slate bg-transparent" style={{width: '140px', fontSize: '0.85rem'}}>
                    <option>All time</option>
                  </select>
                </div>
                <div className="invoice-actions">
                  <Button variant="secondary" className="btn btn-light bg-white border fw-semibold text-dark btn-sm px-3 shadow-sm">Download All</Button>
                  <Button variant="secondary" className="btn btn-light bg-white border fw-semibold text-dark btn-sm px-3 shadow-sm">Export CSV</Button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>INVOICE</th>
                      <th>DATE</th>
                      <th>AMOUNT</th>
                      <th>PAYMENT METHOD</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="invoice-id">{inv.id}</div>
                          <div className="invoice-period">{inv.period}</div>
                        </td>
                        <td>{inv.date}</td>
                        <td className="fw-bold text-dark">{inv.amount}</td>
                        <td>
                          {inv.method === 'Bank Transfer' ? (
                            <span className="text-slate d-flex align-items-center gap-2" style={{fontSize: '0.85rem'}}>
                              <CreditCard size={16} /> {inv.method}
                            </span>
                          ) : (
                            <div className="payment-method-badge">
                              <span className="card-icon">VISA</span> <span className="text-slate" style={{fontSize: '0.85rem'}}>Visa ···· 4242</span>
                            </div>
                          )}
                        </td>
                        <td>
                          {inv.status === 'Paid' ? (
                            <span className="status-badge-sm paid"><div className="status-dot"></div> Paid</span>
                          ) : (
                            <span className="status-badge-sm pending"><div className="status-dot"></div> Pending</span>
                          )}
                        </td>
                        <td>
                          <Button className="download-btn">
                            {inv.status === 'Paid' ? <Download size={16} /> : <Clock size={16} />}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <Button variant="icon" className="page-btn"><ChevronLeft size={16} /></Button>
                <Button className="page-btn active">1</Button>
                <Button className="page-btn">2</Button>
                <Button variant="icon" className="page-btn"><ChevronRight size={16} /></Button>
              </div>
            </div>
          )}

          {activeTab === 'Subscription' && (
            <div className="fade-in p-2">
              <div className="active-tier-card shadow-lg">
                <div className="tier-header">
                  <div>
                    <div className="active-badge"><div className="dot"></div> ACTIVE TIER</div>
                    <div className="tier-title">Enterprise Blueprint</div>
                    <div className="tier-desc">Full architectural control with unlimited historical ledger access and priority API throughput.</div>
                  </div>
                  <div className="tier-price-box">
                    <div className="tier-price">$499.00</div>
                    <div className="tier-billing">per month / billed annually</div>
                    <div className="tier-pill" style={{background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd'}}>
                      <div className="dot" style={{display:'inline-block', width:'6px', height:'6px', borderRadius:'50%', background:'#93c5fd', marginRight:'6px'}}></div> 
                      Enterprise
                    </div>
                  </div>
                </div>

                <div className="tier-details-grid">
                  <div className="tier-detail-box">
                    <div className="td-label">SEATS</div>
                    <div className="td-value">Unlimited Employees</div>
                  </div>
                  <div className="tier-detail-box">
                    <div className="td-label">RENEWAL</div>
                    <div className="td-value">Oct 12, 2024</div>
                  </div>
                  <div className="tier-detail-box">
                    <div className="td-label">BILLING CYCLE</div>
                    <div className="td-value">Annual</div>
                  </div>
                </div>

                <div className="auto-renewal-box">
                  <div className="d-flex align-items-center gap-3">
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                    <div>
                      <div className="fw-bold text-white mb-1" style={{fontSize: '0.95rem'}}>Auto-renewal</div>
                      <div className="text-slate" style={{fontSize: '0.8rem'}}>Your plan renews automatically on Oct 12, 2024</div>
                    </div>
                  </div>
                  <div className="text-green fw-semibold" style={{fontSize: '0.85rem'}}>Enabled</div>
                </div>

                <div className="tier-actions mt-4">
                  <Button className="btn btn-primary bg-blue border-0 fw-semibold px-4" onClick={() => setModalType('pricing')}>Upgrade Plan</Button>
                  <Button variant="ghost" className="btn btn-light bg-transparent border-slate border text-white fw-semibold px-4" style={{borderColor: 'rgba(255,255,255,0.2)'}} onClick={() => setModalType('pricing')}>Modify Plan</Button>
                  <Button variant="outline-destructive" className="btn btn-outline-danger border-danger text-red fw-semibold px-4 ms-2" onClick={() => setModalType('cancel')}>Cancel Subscription</Button>
                </div>
              </div>

              <div className="features-section">
                <div className="features-title">FEATURE ACCESS</div>

                <div className="feature-item">
                  <Check size={18} strokeWidth={3} className="feature-icon check" />
                  <div>
                    <div className="feature-name">Unlimited Ledgers</div>
                    <div className="feature-desc">No cap on project depth</div>
                  </div>
                </div>

                <div className="feature-item">
                  <Check size={18} strokeWidth={3} className="feature-icon check" />
                  <div>
                    <div className="feature-name">Real-time Analytics</div>
                    <div className="feature-desc">Sub-millisecond latency</div>
                  </div>
                </div>

                <div className="feature-item">
                  <Check size={18} strokeWidth={3} className="feature-icon check" />
                  <div>
                    <div className="feature-name">SSO & SAML</div>
                    <div className="feature-desc">Enterprise auth ready</div>
                  </div>
                </div>

                <div className="feature-item">
                  <Check size={18} strokeWidth={3} className="feature-icon check" />
                  <div>
                    <div className="feature-name">Priority Support</div>
                    <div className="feature-desc">Response in &lt; 2 hours</div>
                  </div>
                </div>

                <div className="feature-item">
                  <X size={18} strokeWidth={3} className="feature-icon cross" />
                  <div>
                    <div className="feature-name text-slate">Custom Integrations</div>
                    <div className="feature-desc">Available on Enterprise+</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Payment Methods' && (
            <div className="fade-in p-4 text-center py-5">
              <CreditCard size={48} className="text-slate mb-3 opacity-50 mx-auto" />
              <h4 className="fw-bold text-dark mb-2">Payment Methods</h4>
              <p className="text-slate">Manage your saved credit cards and billing information.</p>
              <Button className="btn btn-primary bg-blue border-0 fw-semibold mt-3">Add Payment Method</Button>
            </div>
          )}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default Plans;
