import Razorpay from "razorpay";
import { config } from "../../config/config";
export const instance = new Razorpay({
  key_id: config.razorpay_key_id,
  key_secret: config.razorpay_secret,
});