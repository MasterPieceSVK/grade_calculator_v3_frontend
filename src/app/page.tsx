"use client";
import { LightbulbIcon } from "@/components/icons/Lightbulb";
import Link from "next/link";

export default function Home() {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("submit");
  }
  return (
    <div className="flex flex-col  items-center h-lvh bg-base-100">
      <section className="flex justify-end w-full h-1/3 ">
        <div className="flex justify-between w-full">
          <Link href={"/tips"}>
            <button className="btn btn-neutral translate-x-5 translate-y-5">
              <LightbulbIcon size={30} />
            </button>
          </Link>
          <Link href={"/edit"}>
            <button className="btn btn-neutral -translate-x-5 translate-y-5">
              Edit
            </button>
          </Link>
        </div>
      </section>
      <form
        className="flex flex-col justify-center items-center h-2/3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-black text-xl font-semibold mb-5">
          Choose an image
        </h2>

        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs text-black border-2 border-black"
          accept=".jpg, .jpeg, .png, .heic, .heif, .webp"
        />
        <div className="flex items-center h-1/2">
          <button className="btn btn-neutral" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
