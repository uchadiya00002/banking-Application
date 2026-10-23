import { lazy, Suspense, useState } from "react";
import "./App.css";
import Sidebar, { type Page } from "./components/Sidebar";

const Dashboard = lazy(() => import("dashboard/Dashboard"));
const Transactions = lazy(() => import("transactions/Transactions"));
const Transfers = lazy(() => import("transfers/Transfers"));
const Profile = lazy(() => import("profile/Profile"));

const pageTitles: Record<Page, string> = {
  dashboard: "Overview",
  transactions: "Transactions",
  transfers: "Transfers",
  profile: "Profile",
};

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [notice, setNotice] = useState("");

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="main-content">
        <header className="topbar">
          <span>Personal banking</span>
          <div className="user-chip">
            <span className="avatar-small">JD</span>
            <span>Jordan Davis</span>
          </div>
        </header>

        <div className="page-content">
          <div className="breadcrumb">MicroBank / {pageTitles[activePage]}</div>

          <Suspense
            fallback={
              <div className="panel" role="status">
                Loading {pageTitles[activePage]} Remote...
              </div>
            }
          >
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "transactions" && <Transactions />}
            {activePage === "transfers" && (
              <Transfers onTransferComplete={setNotice} />
            )}
            {activePage === "profile" && <Profile />}
          </Suspense>
        </div>
      </main>

      {notice && (
        <div className="transfer-notice" role="status">
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
