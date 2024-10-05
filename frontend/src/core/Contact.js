import React, { useEffect } from "react";

export default function Contact(props) {
  useEffect(() => {
    document.title = 'Contact Us | Academic Publications'
  }, [])

  return (
    <div className="text-lg p-8 flex flex-col gap-4">
      <div>Royal Publications</div>
      <div>Address: Sector-3, Rohini, Delhi, India</div>
      <div>WhatsApp your query</div>
      <div>
      <div className="flex gap-2">
        <div>Head: +91-9999888671</div>
        <img className="w-6 h-6" src="/public/images/whatsapp-icon.png" alt="img" />
      </div>
      Nikhil Gupta
      </div>
    </div>
  )
}