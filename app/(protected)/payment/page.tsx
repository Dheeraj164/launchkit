/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { createClient } from "@/utils/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}
export default function PaymentPage() {
  const amount = 500;
  const time = new Date();

  const { user, dashboardData } = useContext(AppContext);
  console.log(dashboardData?.workspace);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch("api/paymentorderid", { method: "POST" });
      const data = await res.json();

      const option = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "Something",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response: unknown) {
          // console.log("Payment Successful: ", response);
          const res = await fetch(
            `/api/validatepayment?workspaceID=${dashboardData?.workspace.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );
          const body = await res.json();
          console.log("body of /api/validatepayment: ", body);
          if (body.message == "Payment Successful") {
            router.push("/dashboard");
          }
          if (body.error === "Payment Failed no valid signature") {
            alert(body.error);
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
      rzp1.on("payment.failed", async function (response: any) {
        console.error("Payment failed:", response.error.metadata);

        await supabase.from("payment").insert({
          order_id: response.error.metadata.order_id,
          payment_id: response.error.metadata.payment_id,
          user_id: user?.id,
          payment_date: time,
          status: "Failure",
          workspace_id: "",
          // expDate: expDate,
        });

        // Optional: log failure to backend
        // await fetch("/api/payment-failed", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     error: response.error,
        //     order_id: data.orderId,
        //   }),
        // });

        alert(
          response.error.description || "Payment failed. Please try again."
        );
      });

      rzp1.open();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    // <div className="flex justify-center items-center min-h-screen">
    //   <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    //   <div className="p-6 bg-white rounded-lg shadow-md">
    //     <h1 className=" text-2xl font-bold mb-4"> payment page</h1>
    //     <p className="mb-4">amount to pay: {amount} INR</p>
    //     <Button
    //       variant="secondary"
    //       onClick={handlePayment}
    //       isDisabled={isProcessing}>
    //       {isProcessing ? "Processing....." : "Pay Now"}
    //     </Button>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center  from-indigo-50 via-white to-indigo-100 px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <Icon icon="mdi:crown" className="text-indigo-600 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Pro Plan</h1>
          <p className="mt-1 text-sm text-gray-500">
            Billed monthly. Cancel anytime.
          </p>
        </div>

        {/* Price */}
        <div className="my-6 rounded-xl bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">Monthly subscription</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            ₹{amount}
            <span className="text-base font-medium text-gray-500">
              {" "}
              / month
            </span>
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3 text-sm text-gray-600">
          {[
            "Unlimited projects",
            "Team collaboration",
            "Advanced analytics",
            "Priority email support",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="text-green-500" />
              {item}
            </li>
          ))}
        </ul>

        {/* Pay Button */}
        <Button
          className="mt-6 w-full"
          variant="primary"
          isDisabled={isProcessing}
          onClick={handlePayment}>
          {isProcessing ? "Processing..." : "Subscribe for ₹500 / month"}
        </Button>

        {/* Trust */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Icon icon="mdi:lock" />
          Secure monthly payments via Razorpay
        </div>
      </div>
    </div>
  );
}
