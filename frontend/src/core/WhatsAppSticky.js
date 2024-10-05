import React from "react";

export default function WhatsAppSticky(props) {
  return (
    <a href={`https://wa.me/919999888671?text=Hi, I have a query regarding publication`} target="_blank">
      <img src="/public/images/whatsapp-logo.png" className="blinkBox fixed right-0 top-96 -rotate-90 origin-bottom-right w-40 h-auto" alt="whatsapp link logo"/>
    </a>
  );
}
