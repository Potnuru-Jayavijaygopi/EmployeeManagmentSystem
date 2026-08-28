import React, { useState, useEffect } from "react";
import {
  Zap,
  Star,
  Plus,
  Clipboard,
  ClipboardList,
  Calendar,
  Users,
  BarChart2,
  Folder,
} from "lucide-react";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";

import ReviewCyclesTab from "./components/ReviewCyclesTab";
import AllReviewsTab from "./components/AllReviewsTab";
import ManagerAssessmentsTab from "./components/ManagerAssessmentsTab";
import ManagerReviewsTab from "./components/ManagerReviewsTab";
import SummaryScoresTab from "./components/SummaryScoresTab";
import CreateReviewModal from "./components/modals/CreateReviewModal";
import CreateCycleModal from "./components/modals/CreateCycleModal";
import CreateKPIModal from "./components/modals/CreateKPIModal";
import CreateCategoryModal from "./components/modals/CreateCategoryModal";
import PerformanceGoals from "./components/PerformanceGoals";
import Button from '../../components/common/Button';
import { mainTabs } from "../../data/mainTabs";
import { performanceService, withFallback } from "../../services";

const Performance = () => {
  const [activeMainTab, setActiveMainTab] = useState("review_cycles");
  const [viewMode, setViewMode] = useState("reviews"); 
  const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false);
  const [isCreateCycleModalOpen, setIsCreateCycleModalOpen] = useState(false);
  const [isCreateKPIModalOpen, setIsCreateKPIModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      const goalsData = await withFallback(performanceService.getGoals(), []);
      const kpisData = await withFallback(performanceService.getKPIs(), []);
      setGoals(goalsData);
      setKpis(kpisData);
    };
    fetchPerformance();
  }, []);

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}
    >

      <div className="d-flex flex-column justify-content-between align-items-md-start mb-4 gap-2">
        <div className="">
          <h2 className="fw-bold mb-1">Performance & Reviews</h2>
          <p className="text-muted mb-0">
            Track goals, KPIs and employee performance reviews
          </p>
        </div>

        <div className="d-flex  align-items-center gap-5 justify-content-end ">
          <div
            className="d-flex bg-white border rounded-md  overflow-hidden "
            style={{ borderRadius: "var(--r-md)", padding: "4px" }}
          >
            <Button 
              variant={viewMode === "goals" ? "primary" : "ghost"}
              type="button"
              className="btn-system-size-default"
              onClick={() => setViewMode("goals")}
            >
              <Zap size={16} /> Performance Goals
            </Button>
            <Button 
              variant={viewMode === "reviews" ? "primary" : "ghost"}
              type="button"
              className="btn-system-size-default"
              onClick={() => setViewMode("reviews")}
            >
              <Star
                size={16}
                fill={viewMode === "reviews" ? "currentColor" : "none"}
              />{" "}
              Reviews
            </Button>
          </div>

          <div className="d-flex align-items-end justify-content-end gap-2 mt-3 mt-md-0 ">
            {viewMode === "goals" ? (
              <>
                <Button variant="outline" className="btn-system btn-system-size-default btn-system-outline bg-white text-primary border-secondary" onClick={() => setIsCreateCategoryModalOpen(true)}>
                  <Folder size={16} className="me-2" /> Manage Categories
                </Button>
                <Button variant="outline" className="btn-system btn-system-size-default btn-system-outline bg-white text-primary border-secondary" onClick={() => setIsCreateKPIModalOpen(true)}>
                  <Plus size={16} className="me-1" /> KPI
                </Button>
                <Button className="btn-system btn-system-size-default btn-system-primary">
                  <Plus size={16} className="me-1" /> Goal
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline"
                  className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary"
                  onClick={() => setIsCreateReviewModalOpen(true)}
                >
                  <Plus size={16} /> Create Review
                </Button>
                <Button variant="outline" className="btn-system btn-system-size-default btn-system-outline bg-white text-dark border-secondary">
                  <ClipboardList size={16} /> Manager Review
                </Button>
                <Button
                  className="btn-system btn-system-size-default btn-system-primary"
                  onClick={() => setIsCreateCycleModalOpen(true)}
                >
                  <Plus size={16} /> Create Cycle
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {viewMode === "goals" ? (
        <PerformanceGoals />
      ) : (
        <>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Active Cycles"
                mainValue="3"
                mainValueColorClass="text-primary-blue"
                footer="2 quarterly · 1 annual"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Pending Reviews"
                mainValue="8"
                mainValueColorClass="text-warning"
                footer="due this week"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Completed"
                mainValue="24"
                mainValueColorClass="text-success"
                footer="this quarter"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Avg Score"
                mainValue="4.2"
                mainValueColorClass="text-purple"
                footer="out of 5.0"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Promotions"
                mainValue="2"
                mainValueColorClass="text-info"
                footer="recommended"
              />
            </div>
          </div>

          <div className="mb-3">
            <Tabs
              tabs={mainTabs}
              activeTab={activeMainTab}
              onTabChange={setActiveMainTab}
            />
          </div>

          {activeMainTab === "review_cycles" && <ReviewCyclesTab />}
          {activeMainTab === "all_reviews" && <AllReviewsTab />}
          {activeMainTab === "managers_assessments" && <ManagerAssessmentsTab />}
          {activeMainTab === "manager_reviews" && <ManagerReviewsTab />}
          {activeMainTab === "summary_scores" && <SummaryScoresTab />}
        </>
      )}

      <CreateReviewModal
        isOpen={isCreateReviewModalOpen}
        onClose={() => setIsCreateReviewModalOpen(false)}
      />

      <CreateCycleModal
        isOpen={isCreateCycleModalOpen}
        onClose={() => setIsCreateCycleModalOpen(false)}
      />

      <CreateKPIModal
        isOpen={isCreateKPIModalOpen}
        onClose={() => setIsCreateKPIModalOpen(false)}
      />
      <CreateCategoryModal 
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
      />
    </div>
  );
};

export default Performance;
