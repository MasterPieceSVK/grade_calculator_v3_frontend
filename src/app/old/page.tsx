"use client";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { convertGrade } from "../../../utils/convertGrade";
import Link from "next/link";

export default function Page() {
  const [points, setPoints] = useState<string>("");
  const [maxPoints, setMaxPoints] = useState<string>("");
  const [grade, setGrade] = useState<number>(1);
  const [nextMaxPoints, setNextMaxPoints] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("one") == null ||
      localStorage.getItem("two") == null ||
      localStorage.getItem("three") == null ||
      localStorage.getItem("four") == null ||
      localStorage.getItem("five") == null
    ) {
      router.push("/edit");
    }
  }, []);

  function handleClick() {
    let wanted;
    const pointsNum = Number(points);
    const maxPointsNum = Number(maxPoints);
    const nextMaxPointsNum = Number(nextMaxPoints);

    if (pointsNum && maxPointsNum && grade && nextMaxPointsNum)
      wanted = convertGrade(String(grade));

    if (wanted) {
      setResult(() => {
        return Number(
          ((maxPointsNum + nextMaxPointsNum) * wanted - pointsNum).toFixed(2)
        );
      });
    }
    console.log(points, maxPoints, grade, nextMaxPoints);
  }

  return (
    <div className="bg-base-100 text-black ">
      <nav className="mt-5 ml-5">
        <Link href="/">
          <button className="btn btn-neutral">
            <HomeIcon size={30} />
          </button>
        </Link>
      </nav>

      <main className="flex flex-col items-center justify-center gap-3 mt-10 ">
        <input
          type="number"
          placeholder="Your points"
          className="input input-bordered w-full max-w-xs text-center"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          required
          min={0.01}
          step={0.01}
        />
        <input
          type="number"
          value={maxPoints}
          placeholder="Your max points"
          className="input input-bordered w-full max-w-xs text-center"
          onChange={(e) => setMaxPoints(e.target.value)}
          required
          min={0.01}
          step={0.01}
        />
        <h2 className="text-xl">Grade Goal</h2>
        <select
          className="select select-bordered w-full max-w-xs text-center"
          onChange={(e) => setGrade(Number(e.target.value))}
          value={grade}
          required
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <input
          type="number"
          value={nextMaxPoints}
          placeholder="Next exam's max points"
          className="input input-bordered w-full max-w-xs text-center"
          onChange={(e) => setNextMaxPoints(e.target.value)}
          required
          min={0.01}
          step={0.01}
        />
        <button className="btn btn-neutral" onClick={handleClick}>
          Calculate
        </button>
        {result !== null && <h2 className="text-4xl mt-5">{result} points</h2>}
      </main>
    </div>
  );
}
