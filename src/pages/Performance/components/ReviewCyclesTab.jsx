import React, { useState, useEffect } from 'react';
import Badge from '../../../components/common/Badge';
import { MoreHorizontal, Edit2, Trash2, BarChart2, Calendar } from 'lucide-react';
import Button from '../../../components/common/Button';
import CycleDetailModal from './modals/CycleDetailModal';
import { performanceService } from '../../../services';

const ReviewCyclesTab = () => {
  const [cycles, setCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const data = await performanceService.getReviewCycles();
        const list = Array.isArray(data) ? data : (data?.results || []);
        setCycles(list);
        if (list.length > 0) setSelectedCycle(list[0]);
      } catch (err) {
        setCycles([]);
      }
    };
    fetchCycles();
  }, []);

  const handleStatsClick = (e, cycle) => {
    e.stopPropagation(); 
    setSelectedCycle(cycle);
    setIsModalOpen(true);
  };

  const handleCycleClick = (cycle) => {
    setSelectedCycle(cycle);
  };

  return (
    <div className="row g-4 mt-1">

      <div className="col-12 col-xl-4">
        <h6 className="text-uppercase text-muted fw-bold small mb-3">Active Cycles</h6>
        <div className="d-flex flex-column gap-3 mb-4">
          {cycles.map((cycle, idx) => {
            const title = cycle.name || cycle.title || `Cycle #${cycle.id}`;
            const type = cycle.review_type || cycle.type || 'Quarterly';
            const status = cycle.status || 'Active';
            const startDate = cycle.start_date || cycle.startDate || '';
            const endDate = cycle.end_date || cycle.endDate || '';
            const progress = cycle.progress_percentage || cycle.progress || 100;

            return (
              <div 
                key={cycle.id || idx} 
                className={`p-3 bg-white rounded-3 cursor-pointer ${selectedCycle?.id === cycle.id ? 'border border-primary border-2 shadow-sm' : 'border'}`}
                onClick={() => handleCycleClick(cycle)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h6 className="mb-0 fw-bold">{title}</h6>
                  <Button variant="outline" className="btn-system btn-system-size-xs btn-system-outline" onClick={(e) => handleStatsClick(e, cycle)}>Stats</Button>
                </div>
                <div className="text-muted small mb-2">{type} · {status}</div>
                <div className="text-primary small mb-2 fw-medium">Start: {startDate} End: {endDate}</div>
              </div>
            );
          })}

          {cycles.length === 0 && (
            <div className="p-4 bg-white rounded-3 border text-center text-muted">
              No active review cycles found in database.
            </div>
          )}
        </div>

        <h6 className="text-uppercase text-muted fw-bold small mb-3 mt-4">Pending</h6>
        <div className="p-3 bg-white border rounded-3 d-flex justify-content-between align-items-center">
          <span className="text-muted fw-medium small">No pending reviews</span>
          <span className="badge bg-secondary rounded-pill">0</span>
        </div>
      </div>

      <div className="col-12 col-xl-8">
        {!selectedCycle ? (
          <div className="bg-white border rounded-4 p-4 h-100 d-flex flex-column">
            <h6 className="fw-bold mb-4">Select a cycle to view details</h6>

            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center text-muted">
              <Calendar size={48} className="text-secondary opacity-50 mb-3" />
              <p>Click a cycle on the left to view participants and progress</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-4">
              <div>
                <h4 className="fw-bold mb-2">{selectedCycle.title}</h4>
                <div className="d-flex align-items-center gap-2">
                  <Badge variant="completed" className="px-2 py-1 bg-purple text-purple rounded">{selectedCycle.type}</Badge>
                  <span className="text-muted small">{selectedCycle.startDate} → {selectedCycle.endDate}</span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline" onClick={(e) => handleStatsClick(e, selectedCycle)}>Stats</Button>
                <Button variant="outline" className="btn-system btn-system-size-sm btn-system-outline-warning" style={{ borderColor: 'var(--warning)', color: 'var(--warning)' }}>Edit</Button>
                <Button variant="destructive" className="btn-system btn-system-size-sm btn-system-outline-danger">Delete</Button>
              </div>
            </div>

            <div className="row g-3 mb-5">
              <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-muted text-uppercase small fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Participants</div>
                  <div className="fs-3 fw-bold">{selectedCycle?.participant_count ?? selectedCycle?.participants ?? 0}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-muted text-uppercase small fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Completed</div>
                  <div className="fs-3 fw-bold text-success">{selectedCycle?.review_count ?? 1}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-muted text-uppercase small fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Pending</div>
                  <div className="fs-3 fw-bold text-warning">0</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-muted text-uppercase small fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Progress</div>
                  <div className="fs-3 fw-bold text-primary">{selectedCycle?.progress_percentage ?? selectedCycle?.progress ?? 100}%</div>
                </div>
              </div>
            </div>

            <h6 className="text-uppercase text-muted fw-bold small mb-4" style={{ letterSpacing: '0.05em' }}>Recent Activity</h6>
            <div className="position-relative ms-2">
              <div className="position-absolute top-0 bottom-0 start-0 border-start border-2" style={{ left: '8px', zIndex: 1 }}></div>

              <div className="d-flex flex-column gap-4 position-relative" style={{ zIndex: 2 }}>
                {(selectedCycle?.activities || []).map((act, i) => (
                  <div key={act.id || i} className="d-flex gap-3 align-items-start">
                    <div 
                      className="rounded-circle border border-white border-2 flex-shrink-0" 
                      style={{ width: '10px', height: '10px', backgroundColor: act.color || '#3b82f6', marginTop: '5px', marginLeft: '0px' }}
                    ></div>
                    <div>
                      <div className="text-dark small fw-medium">{act.text}</div>
                      {act.date && <div className="text-muted" style={{ fontSize: '0.75rem' }}>{act.date}</div>}
                    </div>
                  </div>
                ))}

                {(!selectedCycle?.activities || selectedCycle.activities.length === 0) && (
                  <div className="text-muted small ps-4">
                    No recent activity logs for this review cycle.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <CycleDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cycle={selectedCycle}
      />
    </div>
  );
};

export default ReviewCyclesTab;
