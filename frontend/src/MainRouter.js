import React from "react";
import Root from "./core/Root";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Contact from "./core/Contact";
import Payment from "./core/payment";
import PrivacyPolicy from "./core/PrivacyPolicy";
import RefundPolicy from "./core/RefundPolicy";
import TermsAndConditions from "./core/TermsAndConditions";

export default function MainRouter() {
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="payment" element={<Payment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="refundpolicy" element={<RefundPolicy />} />
          <Route path="terms" element={<TermsAndConditions />} />
        </Route>
      </Routes>
    </React.StrictMode>
  );
}