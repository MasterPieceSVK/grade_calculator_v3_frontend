"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const needed = searchParams.get("needed");
  const mode = searchParams.get("mode");
  const secondValue = searchParams.get("secondvalue");

  return (
    <main className="bg-base-100 text-black flex flex-col justify-center items-center h-lvh ">
      <h2 className="text-3xl">You need</h2>
      {mode == "1" && (
        <h1
          className={`text-7xl rounded-lg p-4 ${
            mode == "1" && needed && Number(needed) < 0
              ? "bg-green-500"
              : Number(needed) > Number(secondValue)
              ? "bg-red-500"
              : "bg-orange-500"
          }`}
        >
          {needed}
        </h1>
      )}
      {mode == "3" && (
        <h1
          className={`text-7xl rounded-lg p-4 ${
            mode == "3" && needed && Number(needed.split("%")[0]) < 0
              ? "bg-green-500"
              : Number(needed.split("%")[0]) > 100
              ? "bg-red-500"
              : "bg-orange-500"
          }`}
        >
          {needed}
        </h1>
      )}
      {needed && !needed.includes("%") && <h2 className="text-3xl">points</h2>}
      <Link href={"/"}>
        <button className="btn btn-neutral mt-6">Home</button>
      </Link>
    </main>
  );
}
