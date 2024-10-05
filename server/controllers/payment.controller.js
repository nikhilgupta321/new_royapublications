import { transactiondb, config } from "../../config/config";
import { instance } from "../config/razorpay";
const Razorpay = require("razorpay");
const crypto = require("crypto");

const initiatePayment = async (req, res) => {
  try {
    const paymentDetails = req.body;
    
    if (!paymentDetails.amount || !paymentDetails.currency) {
      return res.status(400).json({
        success: false,
        message: "not sufficient details",
      });
    }
    const order = await instance.orders.create({
      amount: Number(paymentDetails.amount * 100),
      currency: paymentDetails.currency,
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body.bodyData;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "payment failed order info not provided",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const exprectedSignature = crypto
      .createHmac("sha256", config.razorpay_secret)
      .update(body.toString())
      .digest("hex");

    if(exprectedSignature === razorpay_payment_id){
      return res.status(200).json({
        success:true,
        message:"Payment Verified"
      })
    }

    return res.status(400).json({
      success:false,
      message:"Payment failed"
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error while verifying payment",
    });
  }
};

const getKey = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      key: config.razorpay_key_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error while fetching Razorpay key",
    });
  }
};

export default { initiatePayment, getKey ,paymentVerification};
