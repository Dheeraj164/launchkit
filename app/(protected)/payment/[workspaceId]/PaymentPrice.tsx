export default function PaymentPrice({ amount }: { amount: number }) {
  return (
    <div className="my-6 rounded-xl bg-gray-50 p-4 text-center">
      <p className="text-sm text-gray-500">Monthly subscription</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">
        ₹{amount}
        <span className="text-base font-medium text-gray-500"> / month</span>
      </p>
    </div>
  );
}
