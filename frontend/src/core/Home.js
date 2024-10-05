import React, { useState, useEffect } from "react";
import { list } from "../utils/api-journal";

export default function Home(props) {
  const [journals, setJournals] = useState([])
  const [categories, SetCategories] = useState([])

  useEffect(() => {
    document.title = 'Royal Publications'
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else if (data) {
        setJournals(data.filter(journal => journal.status === "enabled"));
        SetCategories([...new Set(data.filter(journal => journal.status === "enabled").map(journal => journal.category))]);
      }
    })

    return function cleanup() {
      abortController.abort();
    };
  }, [])

  return (
    <>
      {
        categories.map((category, index) => {
          return <>
            <div className="flex p-1 mt-2 bg-blue-B justify-center">
              <div className="px-4 py-1 text-white text-xl w-fit blinkBox">{category}</div>
            </div>
            <div className="my-2 flex flex-col gap-4">
              {journals.filter(journal => journal.category === category).map((journal, index) => {
                return (
                  <div className="text-blue-A text-base font-bold flex gap-4">
                    <div className="text-sm text-right text-red-600 w-10">{index + 1}.</div>
                    <div className="flex w-full flex-col gap-2 md:gap-4 md:flex-row">
                      <div className="md:w-[60%]"><a href={`https://${journal.link}`} target="_blank">{journal.name}</a></div>
                      <div className="md:w-[40%]"><a href={`https://${journal.link}`} target="_blank">{journal.link}</a></div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          </>
        })
      }
    </>
  );
}
