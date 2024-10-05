import React from "react";
import { Outlet, Link } from "react-router-dom";
import WhatsAppSticky from "./WhatsAppSticky";

export default function Root() {
  return (
    <>
      <WhatsAppSticky />
      <div className="p-2 max-w-screen-lg">
        <div className="border-b border-gray-300">
          <div className="flex p-4 text-blue-A font-bold gap-4 items-center justify-center">
            <img className="w-28 h-16" src="/public/images/logo.png" alt="logo" />
            <div className="flex text-center gap-4 flex-col">
              <div className="md:text-3xl">ROYAL PUBLICATIONS</div>
              <div className="md:text-xl">PUBLISH RESEARCH ARTICLE</div>
            </div>
          </div>
          <div className="flex gap-[5px] text-center">
            <Link className="bg-blue-A p-2 flex-1 text-white text-lg" to="/">Home</Link>
            <Link className="bg-blue-A p-2 flex-1 text-white text-lg" to="/payment">Payment</Link>
            <Link className="bg-blue-A p-2 flex-1 text-white text-lg" to="/contact">Contact</Link>
          </div>
          <img className="pt-2" src="/public/images/banner.jpg" />
        </div>
        <Outlet />
        <div className="flex gap-2 flex-wrap mt-4">
          <Link to="/privacypolicy">Privacy Policy</Link>
          <Link to="/refundpolicy">Refund Policy</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>
        <img src="/public/images/PaymentStripe.png" className="mt-4 hidden md:block" />
        <img src="/public/images/PstripeSmall.png" className="mt-4 block md:hidden" />
        <div className="border-t border-gray-300 mt-4 pt-2 w-full text-center">COPYRIGHT © 2023. ALL RIGHTS RESERVED.</div>
      </div>
    </>
  );
}