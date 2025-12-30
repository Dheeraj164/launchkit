import React from "react";

export default function DashboardHeader() {
  return (
    <header className="mb-6">
      <h1 className="text-xl md:text-2xl font-semibold">Overview</h1>
      <p className="text-sm text-gray-600">
        Monitor API usage, quota, and team activity.
      </p>
    </header>
  );
}
