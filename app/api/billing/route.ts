import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const user = (await supabase.auth.getUser()).data.user;
  const { data } = await supabase
    .from("payment")
    .select("id,order_id, payment_id, user_id, expDate, payment_date, ")
    .eq("user_id", user?.id);
  console.log(data);
  return Response.json(
    {
      plan: "pro",
      plan_expires_at: "2025-02-20T00:00:00Z",
      payments: [
        {
          id: "1",
          payment_id: "pay_Lxyz",
          order_id: "order_Kxyz",
          amount: 500,
          status: "success",
          payment_date: "2025-01-20T10:30:00Z",
          exp_date: "2025-02-20T00:00:00Z",
        },
        {
          id: "2",
          payment_id: "pay_dtfh",
          order_id: "order_dftr",
          amount: 500,
          status: "failure",
          payment_date: "2025-01-20T10:30:00Z",
          //   exp_date: "2025-02-20T00:00:00Z",
        },
        {
          id: "3",
          payment_id: "pay_vbnn",
          order_id: "order_piog",
          amount: 500,
          status: "success",
          payment_date: "2025-01-20T10:30:00Z",
          exp_date: "2025-02-20T00:00:00Z",
        },
      ],
    },
    { status: 200 }
  );
}
