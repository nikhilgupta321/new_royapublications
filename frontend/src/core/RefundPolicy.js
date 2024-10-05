import React, { useContext, useEffect } from "react";
import { pageByName } from "../utils/api-page";
import { decode } from 'html-entities';

export default function RefundPolicy(props) {
  const [page, setPage] = React.useState({});
  useEffect(() => {
    document.title = 'Refund Policy | Gupta Publications'
    pageByName('refundpolicy').then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else if (data) {
        setPage(data)
      }
    })
  }, [])

  return (
    <div className="p-8" dangerouslySetInnerHTML={{ __html: decode(page.content) }}></div>
  )
}