/* eslint-disable @typescript-eslint/no-explicit-any */
import BillingCurrentPlan from "./BillingCurrentPlan";
import BillingPaymentHistory from "./BillingPaymentHistory";

interface BillingMainProps {
  workspaceId: string;
  workspaceName: string;
  plan: "Free" | "Pro";
  expiry: Date | null;
  payments: {
    id: any;
    order_id: any;
    payment_id: any;
    amount: any;
    expDate: any;
    payment_date: any;
    status: any;
  }[];
}

export default function BillingMain({
  workspaceId,
  workspaceName,
  plan,
  expiry,
  payments,
}: BillingMainProps) {
  return (
    <>
      {/* CURRENT PLAN */}
      <BillingCurrentPlan
        workspaceId={workspaceId}
        workspaceName={workspaceName}
        plan={plan!}
        expiry={expiry}
      />
      {/* PAYMENT HISTORY */}
      <BillingPaymentHistory payments={payments!} />
    </>
  );
}
