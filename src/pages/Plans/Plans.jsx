import React, { useState, useEffect } from 'react';
import { 
  CreditCard, FileText, Download, Check, X, 
  AlertTriangle, XCircle, Clock, ChevronLeft, ChevronRight, ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Plans.css';
import Button from '../../components/common/Button';
import { subscriptionService } from '../../services';

const Plans = () => {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [modalType, setModalType] = useState(null); 
  const [plans, setPlans] = useState([]);
  const [invoicesList, setInvoicesList] = useState([]);

  useEffect(() => {
    const fetchPlansAndInvoices = async () => {
      const [plansRes, invRes] = await Promise.allSettled([
        subscriptionService.getPlans(),
        subscriptionService.getHistory(),
      ]);

      if (plansRes.status === 'fulfilled') {
        const plansList = plansRes.value;
        const rawList = Array.isArray(plansList)
          ? plansList
          : Array.isArray(plansList?.data?.results)
          ? plansList.data.results
          : Array.isArray(plansList?.results)
          ? plansList.results
          : Array.isArray(plansList?.data)
          ? plansList.data
          : (plansList && typeof plansList === 'object' ? [plansList] : []);
        setPlans(rawList);
      } else {
        setPlans([]);
      }

      if (invRes.status === 'fulfilled') {
        const val = invRes.value;
        const rawInvoices = Array.isArray(val)
          ? val
          : Array.isArray(val?.data?.results)
          ? val.data.results
          : Array.isArray(val?.results)
          ? val.results
          : Array.isArray(val?.data)
          ? val.data
          : (val && typeof val === 'object' && (val.id || val.plan) ? [val] : []);

        const mappedInvoices = rawInvoices.map((inv) => ({
          id: inv.stripe_invoice_id || `INV-2026-00${inv.id || '1'}`,
          period: inv.plan?.display_name ? `${inv.plan.display_name} Subscription (${inv.plan.billing_cycle_display || 'Monthly'})` : (inv.action_display || inv.notes || inv.action || 'Subscription Invoice'),
          date: inv.start_date || (inv.created_at ? new Date(inv.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Aug 31, 2026'),
          amount: (inv.plan?.price || inv.amount) ? `$${parseFloat(inv.plan?.price || inv.amount).toFixed(2)}` : '$19.00',
          method: 'Stripe / Card',
          status: inv.status_display || inv.status || 'Paid',
        }));

        setInvoicesList(mappedInvoices);
      } else {
        setInvoicesList([]);
      }
    };
    fetchPlansAndInvoices();
  }, []);

  const activePlan = plans[0] || null;
  const currentPlanName = activePlan ? (activePlan.display_name || activePlan.plan_name || activePlan.name) : 'Base';
  const currentPlanPrice = activePlan ? `$${parseFloat(activePlan.price || 0).toFixed(2)}` : '$19.00';
  const currentPlanSeats = activePlan ? (activePlan.max_employees ? `Up to ${activePlan.max_employees}` : 'Unlimited') : '10 Seats';
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
              {plans.length > 0 ? (
                plans.map((p) => {
                  const pName = p.display_name || p.plan_name || p.name || 'Plan';
                  const pPrice = parseFloat(p.price || 0).toFixed(0);
                  const pDesc = p.description || 'Subscription plan';
                  const maxEmp = p.max_employees ? `Up to ${p.max_employees} employees` : 'Unlimited employees';
                  const featureObj = p.features && typeof p.features === 'object' ? p.features : {};
                  const featureList = Object.keys(featureObj).filter((k) => featureObj[k] === true);

                  return (
                    <div key={p.id || pName} className={`pricing-card ${p.is_recommended ? 'current' : 'shadow-sm'}`}>
                      {p.is_recommended && <div className="current-plan-badge"><Check size={12} strokeWidth={3} /> Current Plan</div>}
                      <div className="pc-title">{pName}</div>
                      <div className="pc-desc">{pDesc}</div>
                      <div className="pc-price">
                        <span className="currency">$</span> {pPrice} <span className="period">/mo</span>
                      </div>
                      <div className="pc-limit">{maxEmp}</div>

                      <div className="pc-features">
                        {featureList.length > 0 ? (
                          featureList.map((fKey) => (
                            <div key={fKey} className="pc-feature-item">
                              <Check size={16} className="check" /> {fKey.replace(/_/g, ' ').toUpperCase()}
                            </div>
                          ))
                        ) : (
                          <div className="pc-feature-item"><Check size={16} className="check" /> Basic Features</div>
                        )}
                      </div>
                      <Button className={`pc-btn ${p.is_recommended ? 'current' : 'primary'}`} onClick={() => setModalType(null)}>
                        {p.is_recommended ? 'Current Plan' : `Select ${pName}`}
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-4 text-slate">No active plans found in API.</div>
              )}
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
        <p className="text-slate mt-2 mb-0">Manage your subscription plan. You are currently on the <strong>{currentPlanName}</strong> plan.</p>
      </div>

      <div className="plans-kpi-grid">
        <div className="plans-kpi-card">
          <div className="kpi-title">CURRENT PLAN</div>
          <div className="kpi-value">{currentPlanName}</div>
          <div className="kpi-subtext">Active status</div>
        </div>
        <div className="plans-kpi-card">
          <div className="kpi-title">PRICE / RATE</div>
          <div className="kpi-value">{currentPlanPrice}</div>
          <div className="kpi-subtext">Per month</div>
        </div>
        <div className="plans-kpi-card">
          <div className="kpi-title">ACTIVE EMPLOYEE SEATS</div>
          <div className="kpi-value">{currentPlanSeats}</div>
          <div className="kpi-subtext">Included seats</div>
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
                    {invoicesList.length > 0 ? (
                      invoicesList.map((inv, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="invoice-id">{inv.id}</div>
                            <div className="invoice-period">{inv.period}</div>
                          </td>
                          <td>{inv.date}</td>
                          <td className="fw-bold text-dark">{inv.amount}</td>
                          <td>
                            <div className="payment-method-badge">
                              <span className="card-icon">CARD</span> <span className="text-slate" style={{fontSize: '0.85rem'}}>{inv.method}</span>
                            </div>
                          </td>
                          <td>
                            <span className="status-badge-sm paid"><div className="status-dot"></div> {inv.status}</span>
                          </td>
                          <td>
                            <Button className="download-btn">
                              <Download size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-4 text-slate">No invoices found.</td>
                      </tr>
                    )}
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
                    <div className="tier-title">{currentPlanName}</div>
                    <div className="tier-desc">{activePlan?.description || 'Active subscription plan for your organization.'}</div>
                  </div>
                  <div className="tier-price-box">
                    <div className="tier-price">{currentPlanPrice}</div>
                    <div className="tier-billing">per month / {activePlan?.billing_cycle_display || 'Monthly'}</div>
                    <div className="tier-pill" style={{background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd'}}>
                      <div className="dot" style={{display:'inline-block', width:'6px', height:'6px', borderRadius:'50%', background:'#93c5fd', marginRight:'6px'}}></div> 
                      {currentPlanName}
                    </div>
                  </div>
                </div>

                <div className="tier-details-grid">
                  <div className="tier-detail-box">
                    <div className="td-label">SEATS</div>
                    <div className="td-value">{currentPlanSeats}</div>
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
