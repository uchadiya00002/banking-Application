import { lazy, Suspense, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Profile from "./features/profile/Profile";
import Transactions from "./features/transactions/Transactions";
// import Transfers from "./features/transfers/Transfers";
type Page = "dashboard" | "transactions" | "transfers" | "profile";

const Dashboard = lazy(() => import("dashboard/Dashboard"));
const Transfers = lazy(() => import("transfers/Transfers"));
export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [notice, setNotice] = useState("");
  const pageTitles: Record<Page, string> = {
    dashboard: "Overview",
    transactions: "Transactions",
    transfers: "Transfers",
    profile: "Profile",
  };

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
                Loading Dashboard Remote...
              </div>
            }
          >
            {activePage === "dashboard" && <Dashboard />}
          </Suspense>
          {activePage === "transactions" && <Transactions />}

          <Suspense
            fallback={<div className="panel">Loading Transfers Remote...</div>}
          >
            {activePage === "transfers" && (
              <Transfers onTransferComplete={(message) => setNotice(message)} />
            )}
          </Suspense>
          {activePage === "profile" && <Profile />}
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
