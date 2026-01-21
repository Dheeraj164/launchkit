"use client";
import {
  getPaymentOrderId,
  paymentFailed,
} from "@/app/actions/getPaymentOrderId";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import { useContext, useState } from "react";

export default function PaymentButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { user } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const { error, subscription } = await getPaymentOrderId({
        userId: user!.id,
        workspaceId: workspaceId,
      });

      if (error || !subscription) {
        throw new Error("Payment Order Not found");
      }
      const option = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        name: "Something",
        description: "Test Transaction",
        subscription_id: subscription.id,
        // handler: async function (response: RazorpayPaymentResponse) {
        //   const {
        //     razorpay_subscription_id,
        //     razorpay_payment_id,
        //     razorpay_signature,
        //   } = response;

        //   const resp = await fetch("api/validatepayment", {
        //     body: { response: response },
        //   });
        // },
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
