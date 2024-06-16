"use client";
import HistoryCard from "@/components/HistoryCard";
import SadIcon from "@/components/icons/Sad";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [history, setHistory] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem("history");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history from localStorage:", e);
        setHistory([]);
      }
    }
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 text-black text-center text-l text-wrap">
      <section className="flex justify-end w-full h-1/3 ">
        <div className="flex justify-between w-full">
          <Link href={"/"}>
            <button className="btn btn-neutral ml-5 mt-5">Back</button>
          </Link>
        </div>
      </section>
      <main className="h-2/3 mt-3">
        {loaded && history.length === 0 && (
          <div className="flex flex-col justify-center items-center ">
            <SadIcon size={150} />
            <h4 className="text-black">History is empty</h4>
          </div>
        )}
        <div className="flex flex-col gap-1">
          {history.length > 0 &&
            history.map((info, index) => <HistoryCard {...info} key={index} />)}
        </div>
      </main>
    </div>
  );
}
