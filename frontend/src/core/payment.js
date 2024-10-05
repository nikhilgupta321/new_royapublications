import React, { useEffect } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";

export default function Payment(props) {
  const [error, setError] = React.useState("");
  const [paymentDetails, setPaymentDetails] = React.useState({
    currency: "",
    paymentMethod: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    journalName: "",
    articleTitle: "",
    articleRefNo: "",
    amount: "",
  });

  const Razorpay = useRazorpay();

  const handleChange = (name) => (event) => {
    setError("");
    setPaymentDetails({ ...paymentDetails, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    // if (paymentDetails.currency == "") {
    //   setError("Please select a currency");
    //   return;
    // }
    // if (paymentDetails.name == "") {
    //   setError("Please enter your name");
    //   return;
    // }
    // if (paymentDetails.email == "") {
    //   setError("Please enter your email");
    //   return;
    // }
    // if (paymentDetails.phone == "") {
    //   setError("Please enter your phone");
    //   return;
    // }
    // if (paymentDetails.currency == "USD" && paymentDetails.country == "") {
    //   setError("Please enter your country");
    //   return;
    // }
    // if (paymentDetails.journalName == "") {
    //   setError("Please enter the journal name");
    //   return;
    // }
    // if (paymentDetails.articleTitle == "") {
    //   setError("Please enter the article title");
    //   return;
    // }
    // if (paymentDetails.articleRefNo == "") {
    //   setError("Please enter the article reference number");
    //   return;
    // }
    // if (paymentDetails.amount == "") {
    //   setError("Please enter the amount");
    //   return;
    // }
    // if (!paymentDetails.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //   setError("Please enter a valid email");
    //   return;
    // }
    // if (paymentDetails.currency == "INR" && paymentDetails.amount < 1000) {
    //   setError("Minimum amount is 1000 INR");
    //   return;
    // }
    // if (paymentDetails.currency == "USD" && paymentDetails.amount < 20) {
    //   setError("Minimum amount is 20 USD");
    //   return;
    // }

    // setError("");

    // try {

    // } catch (error) {
    //   console.error("err -> ", error);
    //   console.log("error while making payment");
    // }
    const {
      data: { key },
    } = await axios.get("/api/payment/getkey");

    const {
      data: { order },
    } = await axios.post("/api/payment/capturePayment", {
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
    });

    // Step 2: Capture Payment (Razorpay options)
    const options = {
      key,
      amount: order.amount,
      currency: paymentDetails.currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        // Step 3: Verify Payment
        const verificationData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const verifyResponse = await axios.post(
          "/api/payment/verification",
          verificationData
        );
        console.log(verifyResponse.data.message);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    console.log(order,key);
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  useEffect(() => {
    document.title = "Payment | Academic Publications";
  }, []);

  return (
    <div className="p-8 flex justify-center">
      <div className="flex flex-col gap-2 w-3/5">
        <div className="flex gap-2">
          <div className="w-6">1.</div>
          <div className="w-full">
            <div>SELECT CURRENCY</div>
            <div className="flex gap-2">
              <input
                type="radio"
                autoComplete="off"
                name="currency"
                value="INR"
                onChange={handleChange("currency")}
              />
              <div>INR</div>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                autoComplete="off"
                name="currency"
                value="USD"
                onChange={handleChange("currency")}
              />
              <div>USD</div>
            </div>
          </div>
        </div>

        {paymentDetails.currency == "" && (
          <>
            <div className="flex gap-2">
              <div className="w-6">2.</div>
              <div className="w-full">
                <div>NAME</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("name")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">3.</div>
              <div className="w-full">
                <div>EMAIL</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">4.</div>
              <div className="w-full">
                <div>PHONE</div>
                <input
                  type="number"
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("phone")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">5.</div>
              <div className="w-full">
                <div>JOURNAL NAME</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("journalName")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">6.</div>
              <div className="w-full">
                <div>ARTICLE TITLE</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("articleTitle")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">7.</div>
              <div className="w-full">
                <div>ARTICLE REFERENCE NUMBER</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("articleRefNo")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">8.</div>
              <div className="w-full">
                <div>AMOUNT</div>
                <input
                  type="number"
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("amount")}
                />
              </div>
            </div>
          </>
        )}

        {paymentDetails.currency == "INR" && (
          <>
            <div className="flex gap-2">
              <div className="w-6">2.</div>
              <div className="w-full">
                <div>SELECT PAYMENT MODE</div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    autoComplete="off"
                    name="payment-mode"
                    value="RazorPay"
                  />
                  <div>RazorPay (PhonePe, Google Pay, Scan Code)</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">3.</div>
              <div className="w-full">
                <div>NAME</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("name")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">4.</div>
              <div className="w-full">
                <div>EMAIL</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">5.</div>
              <div className="w-full">
                <div>PHONE</div>
                <input
                  type="number"
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("phone")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">6.</div>
              <div className="w-full">
                <div>JOURNAL NAME</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("journalName")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">7.</div>
              <div className="w-full">
                <div>ARTICLE TITLE</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("articleTitle")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">8.</div>
              <div className="w-full">
                <div>ARTICLE REFERENCE NUMBER</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("articleRefNo")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">9.</div>
              <div className="w-full">
                <div>AMOUNT</div>
                <input
                  type="number"
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("amount")}
                />
              </div>
            </div>
          </>
        )}

        {paymentDetails.currency == "USD" && (
          <>
            <div className="flex gap-2">
              <div className="w-6">2.</div>
              <div className="w-full">
                <div>SELECT PAYMENT MODE</div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    autoComplete="of className='w-6'f"
                    name="payment-mode"
                    value="Paypal"
                  />
                  <div>Paypal</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">3.</div>
              <div className="w-full">
                <div>NAME</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("name")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">4.</div>
              <div className="w-full">
                <div>EMAIL</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">5.</div>
              <div className="w-full">
                <div>PHONE WITH ISD CODE</div>
                <input
                  type="number"
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("phone")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">6.</div>
              <div className="w-full">
                <div>COUNTRY</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("country")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">7.</div>
              <div className="w-full">
                <div>JOURNAL NAME</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("journalName")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">8.</div>
              <div className="w-full">
                <div>ARTICLE TITLE</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("articleTitle")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">9.</div>
              <div className="w-full">
                <div>ARTICLE REFERENCE NUMBER</div>
                <input
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("articleRefNo")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6">10.</div>
              <div className="w-full">
                <div>AMOUNT</div>
                <input
                  type="number"
                  className="border rounded border-black p-2 w-full"
                  onChange={handleChange("amount")}
                />
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center">
          {error && <div className="text-lg text-red-700">{error}</div>}
        </div>
        <div className="flex justify-center">
          <div
            className="rounded text-center m-8 text-white font-bold bg-blue-500 w-20 p-2"
            onClick={handleSubmit}
            cursor="pointer"
          >
            Pay Now
          </div>
        </div>
      </div>
    </div>
  );
}
