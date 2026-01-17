import Razorpay from "razorpay";

export async function paymentOrderId({ razorpay }: { razorpay: Razorpay }) {
  try {
    const order = await razorpay.orders.create({
      amount: 500 * 100,
      currency: "INR",
      receipt: `receipt_${Math.random()
        .toString(36)
        .substring(7)}_${Date.now()}`,
    });
    // console.log(order.id);
    return { error: null, orderId: order.id };
  } catch (e) {
    console.log(e);
    return {
      error: `Error while creating the order Payment: ${e}`,
      orderId: null,
    };
  }
}
