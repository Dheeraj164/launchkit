// import { getAllWorkspaceBilling } from "@/app/actions/getAllWorkspaceBilling";
import { getAllWorkspaceBilling } from "@/app/actions/getBillings";
import BillingHeader from "./BillingHeader";
import BillingMain from "./BillingMain";
import Empty from "@/component/Empty";

export default async function BillingPage() {
  const billingData = await getAllWorkspaceBilling();

  if (billingData.length === 0) {
    return (
      <Empty
        header={"No Billing Details to show"}
        message="No Billing details to show "
        button={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto px-4 pt-20 pb-12">
        <BillingHeader />

        {billingData.map((b) => (
          <BillingMain
            key={b.workspaceId}
            workspaceId={b.workspaceId}
            workspaceName={b.workspaceName}
            plan={b.plan}
            expiry={b.plan_expires_at}
            payments={b.payments}
          />
        ))}
      </main>
    </div>
  );
}
