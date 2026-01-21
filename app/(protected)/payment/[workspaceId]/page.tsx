/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from "next/script";
import { Icon } from "@iconify/react";
import PaymentHeader from "./PaymentHeader";
import PaymentPrice from "./PaymentPrice";
import PaymentFeature from "./PaymentFeature";
import PaymentButton from "./PaymentButton";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const amount = 500;
  const { workspaceId } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border p-6">
        <PaymentHeader />
        <PaymentPrice amount={amount} />
        <PaymentFeature />
        <PaymentButton workspaceId={workspaceId} />

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Icon icon="mdi:lock" />
          Secure monthly payments via Razorpay
        </div>
      </div>
    </div>
  );
}

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ workspaceId: string }>;
// }) {
//   const resolvedParams = await params; // server-side

//   return (
//     <pre className="min-h-screen flex items-center justify-center">
//       {JSON.stringify(resolvedParams, null, 2)}
//     </pre>
//   );
// }
