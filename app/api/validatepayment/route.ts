import { createClient } from "@/utils/supabase/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
export const clientSecret = process.env.NEXT_RAZORPAY_SECRET_KEY;

export async function POST(request: Request) {
  const supabase = await createClient();
  const respBody = await request.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    respBody;
  const secret = clientSecret!;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Response body at validatepayment: ", respBody);

  const time = new Date();

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (isValidSignature) {
      await supabase.from("payment").insert({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        user_id: user?.id,
        payment_date: time,
      });

      return Response.json({ message: "Payment Successful" }, { status: 200 });
    } else {
      return Response.json(
        { error: "Payment Failed no valid signature" },
        { status: 503 }
      );
    }
  } catch (e) {
    console.log(e);
    return Response.json({ Error: "Payment Failed" }, { status: 500 });
  }
}
