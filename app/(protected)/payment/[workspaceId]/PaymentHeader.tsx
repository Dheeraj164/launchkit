import { Icon } from "@iconify/react";

export default function PaymentHeader() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
        <Icon icon="mdi:crown" className="text-indigo-600 text-2xl" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Pro Plan</h1>
      <p className="mt-1 text-sm text-gray-500">
        Billed monthly. Cancel anytime.
      </p>
    </div>
  );
}
