import express from "express";
import paymentCtrl from "../controllers/payment.controller";

const router = express.Router();

router.route("/api/payment/capturePayment").post(paymentCtrl.initiatePayment);

router.get("/api/payment/verification",paymentCtrl.paymentVerification);
router.get("/api/payment/getkey", paymentCtrl.getKey);


export default router; 