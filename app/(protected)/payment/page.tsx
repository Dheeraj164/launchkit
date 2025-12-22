"use client";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useContext, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}
export default function PaymentPage() {
  const amount = 500;
  const { user } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

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
          const res = await fetch("/api/validatepayment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });
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
      rzp1.open();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className=" text-2xl font-bold mb-4"> payment page</h1>
        <p className="mb-4">amount to pay: {amount} INR</p>
        <Button
          variant="secondary"
          onClick={handlePayment}
          isDisabled={isProcessing}>
          {isProcessing ? "Processing....." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
}
