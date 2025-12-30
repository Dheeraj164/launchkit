import BillingCurrentPlan from "./BillingCurrentPlan";
import BillingHeader from "./BillingHeader";
import BillingPaymentHistory from "./BillingPaymentHistory";

export default function BillingPage() {
  // if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto  px-4 pt-20 pb-12">
        {/* HEADER */}
        <BillingHeader />

        {/* CURRENT PLAN */}
        <BillingCurrentPlan />

        {/* PAYMENT HISTORY */}
        <BillingPaymentHistory />
      </main>
    </div>
  );
}
