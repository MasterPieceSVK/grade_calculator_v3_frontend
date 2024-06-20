"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { convertGrade } from "../../../utils/convertGrade";

type Error = {
  response?: {
    data?: {
      error: string;
    };
  };
  message: string;
  code?: string;
};

type Response = {
  data: {
    needed: string;
  };
};

function PageContent() {
  const [scanError, setScanError] = useState<boolean>(false);
  const [grades, setGrades] = useState<string>("");
  const [desired, setDesired] = useState<string>("1");
  const [mode, setMode] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("1");
  const [calculateError, setCalculateError] = useState<string>("");
  const [history, setHistory] = useState<string | null>();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let gradesStr = searchParams.get("grades");
    let modeStr = searchParams.get("mode");
    const desiredParam = searchParams.get("desired");
    const secondValueParam = searchParams.get("secondValue");
    if (desiredParam) {
      setDesired(desiredParam);
    }
    if (secondValueParam) {
      setSecondValue(secondValueParam);
    }
    if (modeStr) {
      setMode(modeStr);
      if (modeStr === "1" && !secondValueParam) {
        setSecondValue("10");
      }
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

  useEffect(() => {
    setHistory(localStorage.getItem("history"));
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

  const calculateMutation = useMutation<Response, Error>({
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

      if (history) {
        const storedHistory = JSON.parse(history);
        storedHistory.push({
          grades: gradesArr,
          wanted: desired,
          mode,
          nextPoints: secondValue,
          nextWeight: secondValue,
        });
        localStorage.setItem("history", JSON.stringify(storedHistory));
      } else {
        const newHistory = [
          {
            grades: gradesArr,
            wanted: desired,
            mode,
            nextPoints: secondValue,
            nextWeight: secondValue,
          },
        ];
        localStorage.setItem("history", JSON.stringify(newHistory));
      }

      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/calculate`,
        bodyParams
      );
    },
    onSuccess: (res) => {
      router.push(
        `/result?needed=${res.data.needed}&secondvalue=${secondValue}&mode=${mode}`
      );
    },
    onError: (e) => {
      if (e.response?.data) {
        setCalculateError(e.response.data.error);
      } else if (e.code === "ERR_NETWORK") {
        setCalculateError(
          "Network error: The server might be down. It tends to shut down sometimes. Feel free to use the old version"
        );
      } else if (e.message) {
        setCalculateError(e.message);
      }
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
            The screenshot wasn&apos;t recognized. Please try another screenshot
            or use the{" "}
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
        {calculateError ? (
          <div className="text-red-500  text-center text-wrap w-5/6">
            <h3>
              {!calculateError.includes("Network error:") && "Error:"}{" "}
              {calculateError}
            </h3>
            {calculateError.includes("Network error:") && (
              <a className="link" href="/old">
                here
              </a>
            )}{" "}
          </div>
        ) : (
          <h3 className="w-5/6 text-center text-wrap text-sm">
            Please review if the grades were correctly recognized. If you want
            to add weight, add &apos;@0.25&apos; (0.25 is the weight) to the
            grade (e.g 9/10@0.5)
          </h3>
        )}
        <textarea
          placeholder="Your grades go here"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs h-1/2 md:h-1/3"
          value={grades}
          onChange={handleChange}
        ></textarea>
        <div className="w-full flex flex-col items-center ">
          <h4 className="text-sm">
            Next exam {mode === "1" ? "points" : "weight"}
          </h4>
          <input
            type="number"
            className="input input-bordered w-full max-w-xs text-center"
            value={secondValue}
            onChange={(e) => {
              setSecondValue(e.target.value);
            }}
          />
        </div>

        <select
          className="select select-bordered w-full max-w-xs text-center"
          value={desired}
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
        <button
          className="btn btn-neutral mr-4"
          onClick={handleCalculate}
          disabled={calculateMutation.isPending}
        >
          {calculateMutation.isPending ? "Calculating" : "Calculate"}
        </button>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
