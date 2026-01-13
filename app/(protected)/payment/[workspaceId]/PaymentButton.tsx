"use client";
import {
  getPaymentOrderId,
  paymentFailed,
  verifyPayment,
} from "@/app/actions/getPaymentOrderId";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
export default function PaymentButton({
  amount,
  workspaceId,
}: {
  amount: number;
  workspaceId: string;
}) {
  const { user } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const { error, orderId } = await getPaymentOrderId();

      if (error || !orderId) {
        throw new Error("Payment Order Not found");
      }
      const option = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "Something",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response: RazorpayPaymentResponse) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          const resp = await verifyPayment({
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature,
            workspaceId: workspaceId,
          });

          if (resp.message == "Payment Successful") {
            router.push("/dashboard");
          }
          if (resp.error === "Payment Failed no valid signature") {
            alert(resp.error);
          }
        },
        prefill: {
          name: `${user?.firstname} ${user?.lastname}`,
          email: user?.email,
          contact: user?.phonenumber,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(option);
      rzp1.on("payment.failed", paymentFailed);

      rzp1.open();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      className="mt-6 w-full"
      variant="primary"
      isDisabled={isProcessing}
      onClick={handlePayment}>
      {isProcessing ? "Processing..." : "Subscribe for ₹500 / month"}
    </Button>
  );
}
