"use client";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("grades");

  return (
    <main className="bg-base-100 flex flex-col items-center justify-center h-lvh gap-4 text-black">
      <h3>Please review if the grades were correctly recognized.</h3>
      <textarea
        placeholder="Grades"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
      ></textarea>
      <select className="select select-bordered w-full max-w-xs text-center">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <button className="btn btn-neutral mr-4">Calculate</button>
    </main>
  );
}
