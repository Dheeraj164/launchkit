import { createClient } from "@/utils/supabase/server";
import Razorpay from "razorpay";

export const clientId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
export const clientSecret = process.env.NEXT_RAZORPAY_SECRET_KEY;

export const razorpay = new Razorpay({
  key_id: clientId,
  key_secret: clientSecret,
});

export const supabase = await createClient();
