"use server";
import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { createClient } from "@/utils/supabase/server";

const clientId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
const clientSecret = process.env.NEXT_RAZORPAY_SECRET_KEY;

const razorpay = new Razorpay({
  key_id: clientId,
  key_secret: clientSecret,
});
export async function getPaymentOrderId() {
  try {
    console.log("coming here");
    const order = await razorpay.orders.create({
      amount: 500 * 100,
      currency: "INR",
      receipt: `receipt_${Math.random()
        .toString(36)
        .substring(7)}_${Date.now()}`,
    });
    console.log(order.id);
    return { error: null, orderId: order.id };
  } catch (e) {
    console.log(e);
    return {
      error: `Error while creating the order Payment: ${e}`,
      orderId: null,
    };
  }
}

// console.log(`${Math.random().toString(36).substring(7)}_${Date.now()}`);           //  to create unique receipt number

//   const url = new URL(request.url);
//   const searchParam = url.searchParams.get("test");
//   console.log(searchParam);

export async function verifyPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  workspaceId,
}: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  workspaceId: string;
}) {
  const supabase = await createClient();
  const secret = clientSecret!;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  // console.log("Response body at validatepayment: ", respBody);

  const time = new Date();
  // console.log("Time");
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 30);
  // console.log("expDate: ", expDate);

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (isValidSignature) {
      // console.log("Payment is: ", isValidSignature);
      const { data, error } = await supabase.from("payment").insert({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        // user_id: user?.id,
        payment_date: time,
        expDate: expDate,
        status: "Success",
        workspace_id: workspaceId,
      });
      if (error) console.log(error);

      console.log(data);
      const { error: updateError } = await supabase
        .from("workspaces")
        .update({ plan: "pro" })
        .eq("id", workspaceId);
      if (updateError) console.log(updateError);

      return { message: "Payment Successful", error: null };
    } else {
      return { error: "Payment Failed no valid signature", message: null };
    }
  } catch (e) {
    // console.log(e);
    return { Error: "Payment Failed", message: e };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function paymentFailed(response: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const time = new Date();

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
}
