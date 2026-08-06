import { useState, useRef } from 'react';

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import FilterPills from '../../components/common/FilterPills';
import Modal from '../../components/common/Modal';
import { Check, X, Plus, FileText } from 'lucide-react';
import './Documents.css';
import Button from '../../components/common/Button';
import { filters, sharesData, tableData } from '../../data/documentsFiltersData';

const Documents = ({ onTabChange, onNavigateHome }) => {
  const [activeFilter, setActiveFilter] = useState('All Documents');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
  };

  const handleDownload = () => {
    setIsDetailsModalOpen(false);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 3000);
  };

  return (
    <>
      <div className="dashboard-container">

        <div className="mb-4">
          <Breadcrumb items={['Dashboard', 'Documents']} />
          <h1 className="page-title m-0">Document Management</h1>
          <p className="text-muted small m-0 mt-1">Access and share documents</p>
        </div>

        {showSuccessBanner && (
          <div className="bg-success-light text-success rounded border border-success p-3 mb-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center small fw-medium">
              <Check size={16} className="me-2" /> Document downloaded
            </div>
            <Button variant="ghost" className="btn btn-link text-success p-0 m-0 text-decoration-none" onClick={() => setShowSuccessBanner(false)}>
              <X size={16} />
            </Button>
          </div>
        )}

        <div className="mb-4">
          <FilterPills 
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {activeFilter === 'Shares' ? (
          <div className="bg-white rounded border shadow-sm">
            <div className="p-3 border-bottom">
              <h6 className="fw-bold text-dark m-0 small">Document Sharing Activity</h6>
            </div>
            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr className="bg-light">
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 ps-4" style={{ fontSize: '0.65rem' }}>DOCUMENT</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>SHARED WITH</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>SHARED BY</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>PERMISSIONS</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3" style={{ fontSize: '0.65rem' }}>EXPIRES</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-0 py-3 pe-4" style={{ fontSize: '0.65rem' }}>ACCESSED</th>
                  </tr>
                </thead>
                <tbody>
                  {sharesData.map(share => (
                    <tr key={share.id}>
                      <td className="text-dark small fw-medium py-3 ps-4 border-bottom-0">{share.doc}</td>
                      <td className="text-dark small py-3 border-bottom-0">{share.sharedWith}</td>
                      <td className="text-dark small py-3 border-bottom-0">{share.sharedBy}</td>
                      <td className="py-3 border-bottom-0">
                        <span className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium" style={{ fontSize: '0.65rem' }}>{share.perms}</span>
                      </td>
                      <td className="text-dark small py-3 border-bottom-0">{share.expires}</td>
                      <td className="text-muted small py-3 pe-4 border-bottom-0">{share.accessed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded border shadow-sm">

            <div className="p-3 border-bottom d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center gap-3 me-3">
                <span className="fw-bold text-dark small">All Documents</span>
                <span className="text-muted small cursor-pointer">All Categories</span>
              </div>

              <div className="flex-grow-1 position-relative" style={{ maxWidth: '400px' }}>
                <input 
                  type="text" 
                  className="form-control form-control-sm py-2 pe-3 ps-3 text-muted" 
                  placeholder="Search documents..."
                  style={{ backgroundColor: '#f9fafb', fontSize: '0.85rem' }}
                />
              </div>

              <Button 
                className="btn btn-primary bg-blue border-0 ms-auto d-flex align-items-center py-2" 
                style={{ fontSize: '0.85rem' }}
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Plus size={16} className="me-1" /> Upload Document
              </Button>
            </div>

            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr className="bg-white">
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3 ps-4" style={{ fontSize: '0.65rem' }}>TITLE</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3" style={{ fontSize: '0.65rem' }}>CATEGORY</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3" style={{ fontSize: '0.65rem' }}>OWNER</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3" style={{ fontSize: '0.65rem' }}>SIZE</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3" style={{ fontSize: '0.65rem' }}>VERSION</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3" style={{ fontSize: '0.65rem' }}>STATUS</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3" style={{ fontSize: '0.65rem', maxWidth: '100px' }}>ACCESS LEVEL</th>
                    <th className="text-muted small fw-bold text-uppercase tracking-wide border-bottom py-3 pe-4 text-end" style={{ fontSize: '0.65rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(doc => (
                    <tr key={doc.id}>
                      <td className="py-4 border-bottom ps-4">
                        <div className="text-dark small fw-medium mb-1">{doc.title}</div>
                        <span className="badge bg-light text-secondary rounded px-2 border" style={{ fontSize: '0.6rem' }}>{doc.ext}</span>
                      </td>
                      <td className="text-dark small py-4 border-bottom">{doc.category}</td>
                      <td className="text-dark small py-4 border-bottom">{doc.owner}</td>
                      <td className="text-dark small py-4 border-bottom" style={{ width: '100px' }}>
                        <div className="d-flex flex-wrap">{doc.size.split(' ')[0]}<br />{doc.size.split(' ')[1]}</div>
                      </td>
                      <td className="text-dark small fw-medium py-4 border-bottom">{doc.version}</td>
                      <td className="py-4 border-bottom">
                        <span className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium border border-success" style={{ fontSize: '0.65rem' }}>{doc.status}</span>
                      </td>
                      <td className="py-4 border-bottom">
                        <span className="badge bg-light text-secondary rounded-pill px-2 py-1 fw-medium border" style={{ fontSize: '0.65rem' }}>{doc.access}</span>
                      </td>
                      <td className="text-end py-4 border-bottom pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          <Button variant="secondary" 
                            className="btn btn-sm btn-white border text-muted px-3" 
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setIsDetailsModalOpen(true)}
                          >
                            View
                          </Button>
                          <Button 
                            className="btn btn-sm btn-primary bg-blue border-0 px-3" 
                            style={{ fontSize: '0.75rem' }} 
                            onClick={handleDownload}
                          >
                            Download
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      <Modal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        title={<span className="fw-bold text-dark">Upload Document</span>}
        maxWidth="500px"
      >
        <div className="p-1">
          <div className="mb-3">
            <label className="form-label small text-muted">Title <span className="text-danger">*</span></label>
            <input type="text" className="form-control text-muted" placeholder="Document title" style={{ fontSize: '0.85rem' }} />
          </div>

          <div className="mb-3">
            <label className="form-label small text-muted">Description</label>
            <textarea className="form-control text-muted" placeholder="Document description" rows="3" style={{ fontSize: '0.85rem', resize: 'none' }}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label small text-muted">Category <span className="text-danger">*</span></label>
            <select className="form-select text-dark" style={{ fontSize: '0.85rem' }}>
              <option>Select category</option>
              <option>Projects</option>
              <option>Policies</option>
              <option>Contracts</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small text-muted">Tags (comma-separated)</label>
            <input type="text" className="form-control text-muted" placeholder="e.g. policy, 2025, important" style={{ fontSize: '0.85rem' }} />
          </div>

          <div className="mb-3">
            <label className="form-label small text-muted">Access Level <span className="text-danger">*</span></label>
            <select className="form-select text-dark" style={{ fontSize: '0.85rem' }}>
              <option>Private (Only me)</option>
              <option>Public</option>
              <option>Restricted</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label small text-muted">File <span className="text-danger">*</span></label>
            <input type="file" className="d-none" ref={fileInputRef} onChange={handleFileChange} />
            <div 
              className="border rounded d-flex flex-column align-items-center justify-content-center py-4 cursor-pointer" 
              style={{ borderStyle: 'dashed !important', backgroundColor: '#f9fafb' }}
              onClick={handleBrowseClick}
            >
              <FileText size={24} className="text-muted mb-2" />
              {selectedFile ? (
                <span className="small text-dark fw-medium" style={{ fontSize: '0.8rem' }}>
                  {selectedFile.name}
                </span>
              ) : (
                <span className="small text-muted" style={{ fontSize: '0.8rem' }}>
                  Drag &amp; drop or <span className="text-blue fw-medium">browse file</span>
                </span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <Button variant="secondary" className="btn btn-white border px-4 py-2 text-muted fw-medium" style={{ fontSize: '0.85rem' }} onClick={handleCloseUploadModal}>Cancel</Button>
            <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-medium" style={{ fontSize: '0.85rem' }} onClick={handleCloseUploadModal}>Upload</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={<span className="fw-bold text-dark">Document Details</span>}
        maxWidth="550px"
      >
        <div className="p-1">
          <h4 className="fw-bold text-dark mb-2">Data Privacy &amp; Security Compliance Certificate</h4>

          <div className="d-flex gap-2 mb-4">
            <span className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium border border-success" style={{ fontSize: '0.65rem' }}>active</span>
            <span className="badge bg-light text-secondary rounded-pill px-2 py-1 fw-medium border" style={{ fontSize: '0.65rem' }}>private</span>
          </div>

          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Category</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>Projects</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Description</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>rtyuio</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Uploaded by</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>Emp Test</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Size</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>261.19 KB</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Version</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>1</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Downloads</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>0</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Created</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>Jan 06, 2026 02:40 PM</div>
          </div>
          <div className="mb-4 pb-4 border-bottom d-flex align-items-center">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Tags</div>
            <div className="w-75">
              <span className="badge bg-light text-secondary rounded px-2 border" style={{ fontSize: '0.65rem' }}>ng</span>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" className="btn btn-white border px-4 py-2 text-muted fw-medium" style={{ fontSize: '0.85rem' }} onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
            <Button className="btn btn-primary bg-blue border-0 px-4 py-2 fw-medium" style={{ fontSize: '0.85rem' }} onClick={handleDownload}>Download</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Documents;
