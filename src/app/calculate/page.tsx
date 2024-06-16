"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { convertGrade } from "../../../utils/convertGrade";

export default function Page() {
  const [scanError, setScanError] = useState<boolean>(false);
  const [grades, setGrades] = useState<string>("");
  const [desired, setDesired] = useState<string>("1");
  const [mode, setMode] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("1");

  const searchParams = useSearchParams();

  useEffect(() => {
    let gradesStr = searchParams.get("grades");
    let modeStr = searchParams.get("mode");
    if (modeStr) {
      setMode(modeStr);
    }
    if (gradesStr) {
      gradesStr = gradesStr.replaceAll(/[\[\]"]/g, "");
      gradesStr = gradesStr.replaceAll(",", "\n");
      setGrades(gradesStr);
    } else {
      setScanError(true);
    }
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setGrades(e.target.value);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value) {
      setDesired(e.target.value);
    }
  }

  const calculateMutation = useMutation({
    mutationFn: () => {
      let gradesArr = grades.split("\n");

      const wanted = convertGrade(desired);
      let bodyParams = {
        grades: gradesArr,
        wanted,
        mode,
        nextPoints: secondValue,
        nextWeight: secondValue,
      };

      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/calculate`,
        bodyParams
      );
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleCalculate() {
    calculateMutation.mutate();
  }

  return (
    <div className="bg-base-100">
      <Link href={"/"}>
        <button className="btn btn-neutral mt-4 ml-4">Back</button>
      </Link>
      <main className="bg-base-100 flex flex-col items-center justify-center h-lvh gap-4 text-black">
        {scanError && (
          <h4 className="text-red-600 text-center text-wrap w-5/6">
            The screenshot wasn't recognized. Please try another screenshot or
            use the{" "}
            <a className="link" href="/old">
              old version
            </a>{" "}
            or read the{" "}
            <a className="link" href="/tips">
              tips
            </a>{" "}
            to resolve the issue
          </h4>
        )}
        <h3 className="w-5/6 text-center text-wrap">
          Please review if the grades were correctly recognized.
        </h3>
        <textarea
          placeholder="Your grades go here"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs h-1/2 md:h-1/3"
          value={grades}
          onChange={handleChange}
        ></textarea>
        <div className="w-full flex flex-col items-center ">
          <h4 className="text-sm">
            Next exam {mode == "1" ? "points" : "weight"}
          </h4>
          <input
            type="number"
            defaultValue={secondValue}
            className="input input-bordered w-full max-w-xs text-center"
            value={secondValue}
            onChange={(e) => {
              setSecondValue(e.target.value);
            }}
          />
        </div>

        <select
          className="select select-bordered w-full max-w-xs text-center"
          onChange={handleSelectChange}
        >
          <option value={0} disabled>
            Select desired grade
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button className="btn btn-neutral mr-4" onClick={handleCalculate}>
          Calculate
        </button>
      </main>
    </div>
  );
}
