import Razorpay from "razorpay";

export async function paymentOrderId({
  razorpay,
  workspaceId,
  userId,
}: {
  razorpay: Razorpay;
  workspaceId: string;
  userId: string;
}) {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: `launchKitProPlan`,
      customer_notify: 1,
      quantity: 1,
      total_count: 120,
      notes: {
        workspace_id: workspaceId,
        userId: userId,
      },
    });
    // console.log(order.id);
    return { error: null, subscription: subscription };
  } catch (e) {
    console.log(e);
    return {
      error: `Error while creating the order Payment: ${e}`,
      subscription: null,
    };
  }
}
