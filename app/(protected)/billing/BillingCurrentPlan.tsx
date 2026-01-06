"use client";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { Activity, useContext, useEffect, useState } from "react";

export default function BillingCurrentPlan() {
  const [plan, setPlan] = useState<"Free" | "Pro">("Free");
  const [expiry, setExpiry] = useState<Date | null>(null);
  const { setPayments } = useContext(AppContext);

  useEffect(() => {
    async function loadBilling() {
      try {
        const res = await fetch("/api/billing");
        const json = await res.json();

        setPayments(json.payments);
        setPlan(json.plan);
        setExpiry(json.plan_expires_at);
      } catch (e) {
        console.error(e);
      }
    }
    loadBilling();
  }, [setPayments, plan]);
  return (
    <section className="mb-6 rounded-lg bg-white p-4 shadow border border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Current Plan</p>
        <p className="text-lg font-medium capitalize">{plan}</p>
        <Activity
          mode={expiry && new Date(expiry) < new Date() ? "visible" : "hidden"}>
          <p className="text-xs text-gray-500">
            Expires on {new Date(expiry!).toLocaleDateString()}
          </p>
        </Activity>
      </div>
      <Activity mode={plan === "Free" ? "visible" : "hidden"}>
        <Link
          href="/payment"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
          Upgrade to Pro
        </Link>
      </Activity>
    </section>
  );
}
