import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  //   console.log(user?.id);
  const { data: paymentData } = await supabase
    .from("payment")
    .select("id,order_id, payment_id, amount, expDate, payment_date,status")
    .eq("user_id", user?.id)
    .order("expDate", { ascending: false });

  if (!paymentData) {
    return Response.json(
      {
        error: "No Payment History Found",
      },
      { status: 404 }
    );
  } else {
    // console.log(paymentData);

    const today = new Date();
    const expDate = new Date(paymentData[0].expDate);

    return Response.json(
      {
        plan: today <= expDate ? "Pro" : "Free",
        plan_expires_at: expDate,
        payments: paymentData,
      },
      { status: 200 }
    );
  }
}
