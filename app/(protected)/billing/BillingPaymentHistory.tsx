import { Icon } from "@iconify/react";

interface paymentProps {
  payments: {
    id: string;
    order_id: string;
    payment_id: string;
    amount: string;
    expDate: string;
    payment_date: string;
    status: string;
  }[];
}
export default function BillingPaymentHistory({ payments }: paymentProps) {
  // const { payments } = useContext(AppContext);
  return (
    <div className="rounded-lg bg-white shadow border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-sm font-medium">Payment History</h2>
      </div>

      {payments && payments.length === 0 && (
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
                        p.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      <Icon
                        icon={
                          p.status === "Success"
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
                  <td className="flex pt-1 ">
                    <Icon
                      icon={"material-symbols:download-sharp"}
                      height={20}
                      width={20}
                    />
                    <p className="px-1"> Download</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
