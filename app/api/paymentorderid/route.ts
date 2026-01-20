import { getUserAndToken } from "@/app/functions/auth";
import Razorpay from "razorpay";

export const clientId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
export const clientSecret = process.env.RAZORPAY_SECRET_KEY;

export const razorpay = new Razorpay({
  key_id: clientId,
  key_secret: clientSecret,
});

export async function POST(req: Request) {
  const auth = await getUserAndToken(req);

  if (!auth) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  }

  try {
    const order = await razorpay.orders.create({
      amount: 500 * 100,
      currency: "INR",
      receipt: `receipt_${Math.random()
        .toString(36)
        .substring(7)}_${Date.now()}`,
    });

    return Response.json({ error: null, orderId: order.id }, { status: 200 });
  } catch (e) {
    return Response.json(
      {
        error: `Error while creating the order Payment failed ${e}`,
        orderId: null,
      },
      { status: 500 },
    );
  }
}

// console.log(`${Math.random().toString(36).substring(7)}_${Date.now()}`);           //  to create unique receipt number

//   const url = new URL(request.url);
//   const searchParam = url.searchParams.get("test");
//   console.log(searchParam);
