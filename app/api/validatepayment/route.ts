import { getUserAndToken } from "@/app/functions/auth";
import { createUserSupabase } from "@/utils/supabase/mobile";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
export const clientSecret = process.env.NEXT_RAZORPAY_SECRET_KEY;

export async function POST(request: Request) {
  const auth = await getUserAndToken(request);

  if (!auth) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  }

  const { user, accessToken } = auth;

  /* 2️⃣ Create user-scoped DB client */
  const supabase = createUserSupabase(accessToken);
  const respBody = await request.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    workspace_id,
  } = respBody;
  const secret = clientSecret!;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const time = new Date();

  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 30);
  // console.log("expDate: ", expDate);

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret,
    );

    if (isValidSignature) {
      // console.log("Payment is: ", isValidSignature);
      await supabase.from("payment").insert({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        user_id: user?.id,
        payment_date: time,
        expDate: expDate,
        status: "Success",
        workspace_id: workspace_id,
      });

      return Response.json({ message: "Payment Successful" }, { status: 200 });
    } else {
      return Response.json({ message: "Payment Failed" }, { status: 503 });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // console.log(e);
    return Response.json(
      { message: `Error while Payment: ${e}` },
      { status: 500 },
    );
  }
}
