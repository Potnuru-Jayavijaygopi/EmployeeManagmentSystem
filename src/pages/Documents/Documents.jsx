import { useState, useRef, useEffect } from 'react';

import Breadcrumb from '../../components/dashboard/Breadcrumb';
import FilterPills from '../../components/common/FilterPills';
import Modal from '../../components/common/Modal';
import { Check, X, Plus, FileText } from 'lucide-react';
import './Documents.css';
import Button from '../../components/common/Button';
import { documentService } from '../../services';

const Documents = ({ onTabChange, onNavigateHome }) => {
  const [activeFilter, setActiveFilter] = useState('All Documents');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shares, setShares] = useState([]);

  useEffect(() => {
    const fetchDocsData = async () => {
      const [docsRes, catsRes, sharesRes] = await Promise.allSettled([
        documentService.getDocuments(),
        documentService.getCategories(),
        documentService.getShares(),
      ]);

      if (docsRes.status === 'fulfilled') {
        const docs = docsRes.value;
        setDocuments(Array.isArray(docs) ? docs : (docs?.results || []));
      } else { setDocuments([]); }

      if (catsRes.status === 'fulfilled') {
        const cats = catsRes.value;
        setCategories(Array.isArray(cats) ? cats : (cats?.results || []));
      } else { setCategories([]); }

      if (sharesRes.status === 'fulfilled') {
        const sharesData = sharesRes.value;
        setShares(Array.isArray(sharesData) ? sharesData : (sharesData?.results || []));
      } else { setShares([]); }
    };
    fetchDocsData();
  }, []);

  const dynamicFilters = [
    { id: "All Documents", label: "All Documents", count: documents.length },
    { id: "My Documents", label: "My Documents", count: documents.length },
    { id: "Shared with me", label: "Shared with me", count: documents.filter(d => d.access_level !== 'private').length },
    { id: "Shares", label: "Shares", count: shares.length },
  ];

  const getFilteredDocuments = () => {
    const filterKey = String(activeFilter).toLowerCase();
    if (filterKey.includes('my')) {
      return documents;
    }
    if (filterKey.includes('shared')) {
      return documents.filter(d => d.access_level !== 'private');
    }
    return documents;
  };

  const displayedTableData = getFilteredDocuments();

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

  const handleViewDetails = (doc) => {
    setSelectedDoc(doc);
    setIsDetailsModalOpen(true);
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
            filters={dynamicFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {activeFilter === 'Shares' ? (
          <div className="bg-white rounded border shadow-sm">
            <div className="p-3 border-bottom">
              <h6 className="fw-bold text-dark m-0 small">Document Sharing Activity ({shares.length})</h6>
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
                  {shares.map((share, idx) => {
                    const docTitle = share.document_title || share.document_name || `Document #${share.document}`;
                    const sharedWith = share.shared_with_name || share.shared_with_email || 'Team User';
                    const sharedBy = share.shared_by_name || share.shared_by_email || 'Admin User';
                    const perms = share.can_download ? 'Download' : 'View Only';
                    const expires = share.expires_at ? share.expires_at.substring(0, 10) : 'Never';
                    const accessed = share.accessed ? 'Accessed' : '0 times';

                    return (
                      <tr key={share.id || idx}>
                        <td className="text-dark small fw-medium py-3 ps-4 border-bottom-0">{docTitle}</td>
                        <td className="text-dark small py-3 border-bottom-0">{sharedWith}</td>
                        <td className="text-dark small py-3 border-bottom-0">{sharedBy}</td>
                        <td className="py-3 border-bottom-0">
                          <span className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium" style={{ fontSize: '0.65rem' }}>{perms}</span>
                        </td>
                        <td className="text-dark small py-3 border-bottom-0">{expires}</td>
                        <td className="text-muted small py-3 pe-4 border-bottom-0">{accessed}</td>
                      </tr>
                    );
                  })}

                  {shares.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">No document shares found in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded border shadow-sm">

            <div className="p-3 border-bottom d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center gap-3 me-3">
                <span className="fw-bold text-dark small">{activeFilter} ({displayedTableData.length})</span>
                <span className="text-muted small cursor-pointer">All Categories ({categories.length})</span>
              </div>

              <div className="flex-grow-1 position-relative" style={{ maxWidth: '400px' }}>
                <input 
                  type="text" 
                  className="form-control form-control-sm py-2 pe-3 ps-3 text-muted" 
                  placeholder="Search documents..."
                  style={{ backgroundColor: '#f9fafb', fontSize: '0.85rem' }}
                />
              </div>

              <Button className="btn btn-primary bg-blue border-0 px-3 py-2 fw-semibold d-flex align-items-center shadow-sm" onClick={() => setIsUploadModalOpen(true)}>
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
                  {displayedTableData.length > 0 ? (
                    displayedTableData.map((doc, idx) => {
                      const title = doc.title || `Document #${doc.id}`;
                      const ext = doc.file_type || doc.ext || 'file';
                      const category = doc.category_name || doc.category || 'General';
                      const owner = doc.uploaded_by_name || doc.owner || 'Brahma Admin';
                      const size = doc.file_size ? `${(Number(doc.file_size) / 1024).toFixed(1)} KB` : (doc.size || '100 KB');
                      const version = String(doc.current_version || doc.version || 1);
                      const status = doc.status || 'active';
                      const access = doc.access_level || doc.access || 'private';

                      return (
                        <tr key={doc.id || idx}>
                          <td className="py-4 border-bottom ps-4">
                            <div className="text-dark small fw-medium mb-1">{title}</div>
                            <span className="badge bg-light text-secondary rounded px-2 border text-uppercase" style={{ fontSize: '0.6rem' }}>{ext}</span>
                          </td>
                          <td className="text-dark small py-4 border-bottom">{category}</td>
                          <td className="text-dark small py-4 border-bottom">{owner}</td>
                          <td className="text-dark small py-4 border-bottom" style={{ width: '100px' }}>
                            <div className="d-flex flex-wrap">{size}</div>
                          </td>
                          <td className="text-dark small fw-medium py-4 border-bottom">{version}</td>
                          <td className="py-4 border-bottom">
                            <span className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium border border-success text-capitalize" style={{ fontSize: '0.65rem' }}>{status}</span>
                          </td>
                          <td className="py-4 border-bottom">
                            <span className="badge bg-light text-secondary rounded-pill px-2 py-1 fw-medium border text-capitalize" style={{ fontSize: '0.65rem' }}>{access}</span>
                          </td>
                          <td className="text-end py-4 border-bottom pe-4">
                            <div className="d-flex justify-content-end gap-2">
                              <Button variant="secondary" 
                                className="btn btn-sm btn-white border text-muted px-3" 
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => handleViewDetails(doc)}
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
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">No documents found in database.</td>
                    </tr>
                  )}
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
          <h4 className="fw-bold text-dark mb-2">{selectedDoc?.title || 'Document Details'}</h4>

          <div className="d-flex gap-2 mb-4">
            <span className="badge bg-success-light text-success rounded-pill px-2 py-1 fw-medium border border-success text-capitalize" style={{ fontSize: '0.65rem' }}>{selectedDoc?.status || 'active'}</span>
            <span className="badge bg-light text-secondary rounded-pill px-2 py-1 fw-medium border text-capitalize" style={{ fontSize: '0.65rem' }}>{selectedDoc?.access_level || 'private'}</span>
          </div>

          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Category</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.category_name || selectedDoc?.category || 'General'}</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Description</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.description || 'N/A'}</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Uploaded by</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.uploaded_by_name || selectedDoc?.owner || 'Admin User'}</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Size</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.file_size ? `${(Number(selectedDoc.file_size) / 1024).toFixed(1)} KB` : '100 KB'}</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Version</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.current_version || 1}</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Downloads</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.download_count || 0}</div>
          </div>
          <div className="mb-3 pb-3 border-bottom d-flex">
            <div className="text-muted small w-25" style={{ fontSize: '0.85rem' }}>Created</div>
            <div className="text-dark small fw-medium w-75" style={{ fontSize: '0.85rem' }}>{selectedDoc?.created_at ? selectedDoc.created_at.substring(0, 10) : 'Recently'}</div>
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
