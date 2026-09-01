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
  const [reviewCycles, setReviewCycles] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      const [goalsRes, kpisRes, cyclesRes, reviewsRes] = await Promise.allSettled([
        performanceService.getGoals(),
        performanceService.getKPIs(),
        performanceService.getReviewCycles(),
        performanceService.getReviews(),
      ]);

      if (goalsRes.status === 'fulfilled') {
        const goalsData = goalsRes.value;
        setGoals(Array.isArray(goalsData) ? goalsData : (goalsData?.results || []));
      } else { setGoals([]); }

      if (kpisRes.status === 'fulfilled') {
        const kpisData = kpisRes.value;
        setKpis(Array.isArray(kpisData) ? kpisData : (kpisData?.results || []));
      } else { setKpis([]); }

      if (cyclesRes.status === 'fulfilled') {
        const cyclesData = cyclesRes.value;
        setReviewCycles(Array.isArray(cyclesData) ? cyclesData : (cyclesData?.results || []));
      } else { setReviewCycles([]); }

      if (reviewsRes.status === 'fulfilled') {
        const reviewsData = reviewsRes.value;
        setReviews(Array.isArray(reviewsData) ? reviewsData : (reviewsData?.results || []));
      } else { setReviews([]); }
    };
    fetchPerformance();
  }, []);

  const activeCyclesCount = reviewCycles.filter(c => String(c.status).toLowerCase() === 'active').length || reviewCycles.length;
  const pendingReviewsCount = reviews.filter(r => ['pending', 'in_progress', 'draft'].includes(String(r.status).toLowerCase())).length;
  const completedReviewsCount = reviews.filter(r => String(r.status).toLowerCase() === 'completed').length;
  const ratingsList = reviews.map(r => Number(r.overall_rating || 0)).filter(r => r > 0);
  const avgScore = ratingsList.length > 0 ? (ratingsList.reduce((a, b) => a + b, 0) / ratingsList.length).toFixed(1) : "0.0";
  const promotionsCount = reviews.filter(r => r.promotion_recommended || String(r.promotion).toLowerCase() === 'recommended').length;

  const dynamicMainTabs = [
    {
      id: "review_cycles",
      label: "Review Cycles",
      badge: String(reviewCycles.length),
      icon: <Calendar size={16} />,
    },
    {
      id: "all_reviews",
      label: "All Reviews",
      badge: String(reviews.length),
      icon: <Calendar size={16} />,
    },
    {
      id: "managers_assessments",
      label: "Manager's Assessments",
      badge: String(reviews.length),
      icon: <Users size={16} />,
    },
    {
      id: "manager_reviews",
      label: "Manager Reviews",
      badge: String(reviews.length),
      icon: <Users size={16} />,
    },
    {
      id: "summary_scores",
      label: "Summary & Scores",
      icon: <BarChart2 size={16} />,
    },
  ];

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
                mainValue={String(activeCyclesCount)}
                mainValueColorClass="text-primary-blue"
                footer="Live cycles"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Pending Reviews"
                mainValue={String(pendingReviewsCount)}
                mainValueColorClass="text-warning"
                footer="action required"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Completed"
                mainValue={String(completedReviewsCount)}
                mainValueColorClass="text-success"
                footer="from API"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Avg Score"
                mainValue={String(avgScore)}
                mainValueColorClass="text-purple"
                footer="out of 5.0"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <StatCard
                title="Promotions"
                mainValue={String(promotionsCount)}
                mainValueColorClass="text-info"
                footer="recommended"
              />
            </div>
          </div>

          <div className="mb-3">
            <Tabs
              tabs={dynamicMainTabs}
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
