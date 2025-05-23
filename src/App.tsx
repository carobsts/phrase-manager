import { Suspense, lazy } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

const Dashboard = lazy(() =>
  import("./features/dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
