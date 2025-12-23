"use client";

import { useEffect, useState } from "react";
import Loading from "@/component/Loading";
import { Icon } from "@iconify/react";

interface Payment {
  id: string;
  payment_id: string;
  order_id: string;
  amount: number;
  status: "success" | "failed";
  payment_date: string;
  exp_date: string | null;
}

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [expiry, setExpiry] = useState<string | null>(null);

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
      } finally {
        setLoading(false);
      }
    }
    loadBilling();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto  px-4 pt-20 pb-12">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Billing & Payments</h1>
          <p className="text-sm text-gray-600">
            View your plan and payment history.
          </p>
        </div>

        {/* CURRENT PLAN */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="text-lg font-medium capitalize">{plan}</p>
            {expiry && (
              <p className="text-xs text-gray-500">
                Expires on {new Date(expiry).toLocaleDateString()}
              </p>
            )}
          </div>

          {plan === "free" && (
            <a
              href="/payment"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              Upgrade to Pro
            </a>
          )}
        </div>

        {/* PAYMENT HISTORY */}
        <div className="rounded-lg bg-white shadow border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-medium">Payment History</h2>
          </div>

          {payments.length === 0 && (
            <div className="p-6 text-sm text-gray-500">No payments found.</div>
          )}

          {payments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Payment ID</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {new Date(p.payment_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">₹{p.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                            p.status === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                          <Icon
                            icon={
                              p.status === "success"
                                ? "mdi:check-circle"
                                : "mdi:close-circle"
                            }
                          />
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {p.payment_id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
