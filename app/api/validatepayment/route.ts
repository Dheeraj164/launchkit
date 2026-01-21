// export const runtime = "nodejs";

// import { getUserAndToken } from "@/app/functions/auth";
// import { createUserSupabase } from "@/utils/supabase/mobile";
// import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
// const clientSecret = process.env.RAZORPAY_SECRET_KEY;

// export async function POST(request: Request) {
//   const auth = await getUserAndToken(request);

//   if (!auth) {
//     return Response.json(
//       { error: "Unauthorized user", data: null },
//       { status: 401 },
//     );
//   }

//   const { accessToken } = auth;

//   /* 2️⃣ Create user-scoped DB client */
//   const supabase = createUserSupabase(accessToken);
//   const respBody = await request.json();
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     workspace_id,
//   } = respBody;
//   const secret = clientSecret!;
//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const time = new Date();

//   const expDate = new Date();
//   expDate.setDate(expDate.getDate() + 30);
//   // console.log("expDate: ", expDate);

//   try {
//     const isValidSignature = validateWebhookSignature(
//       body,
//       razorpay_signature,
//       secret,
//     );

//     if (isValidSignature) {
//       console.log("Payment is: ", isValidSignature);
//       await supabase.from("payment").insert({
//         order_id: razorpay_order_id,
//         payment_id: razorpay_payment_id,
//         payment_date: time,
//         expDate: expDate,
//         status: "Success",
//         workspace_id: workspace_id,
//       });

//       await supabase
//         .from("workspaces")
//         .update({ plan: "pro" })
//         .eq("id", workspace_id);

//       return Response.json({ message: "Payment Successful" }, { status: 200 });
//     } else {
//       return Response.json({ message: "Payment Failed" }, { status: 503 });
//     }
//   } catch (e) {
//     // console.log(e);
//     return Response.json(
//       { message: `Error while Payment: ${e}` },
//       { status: 500 },
//     );
//   }
// }
export const runtime = "nodejs";

import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { createServiceSupabase } from "@/utils/supabase/service";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature")!;

  try {
    validateWebhookSignature(
      rawBody,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET!,
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const supabase = createServiceSupabase(); // service role

  // ✅ Monthly charge success
  if (event.event === "invoice.paid") {
    const subscription = event.payload.subscription.entity;
    const payment = event.payload.payment.entity;

    await supabase.from("subscriptions").upsert({
      subscription_id: subscription.id,
      payment_id: payment.id,
      status: "active",
      current_end: new Date(subscription.current_end * 1000),
    });

    await supabase
      .from("workspaces")
      .update({ plan: "pro" })
      .eq("id", subscription.notes.workspace_id);
  }

  // ❌ Autopay failed
  if (event.event === "payment.failed") {
    await supabase
      .from("subscriptions")
      .update({ status: "past_due" })
      .eq("subscription_id", event.payload.subscription.entity.id);
  }

  // 🚫 Cancelled
  if (event.event === "subscription.cancelled") {
    await supabase
      .from("subscriptions")
      .update({ status: "cancelled" })
      .eq("subscription_id", event.payload.subscription.entity.id);
  }

  return Response.json({ received: true });
}
