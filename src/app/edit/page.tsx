"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [one, setOne] = useState<number | string>();
  const [two, setTwo] = useState<number | string>();
  const [three, setThree] = useState<number | string>();
  const [four, setFour] = useState<number | string>();
  const [five, setFive] = useState<number | string>();
  const router = useRouter();

  useEffect(() => {
    const getValue = (key: string, defaultValue: number) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        const numberValue = Number(value) * 100;
        return numberValue % 1 === 0 ? numberValue : numberValue.toFixed(2);
      }
      return defaultValue;
    };

    setOne(getValue("one", 85));
    setTwo(getValue("two", 70));
    setThree(getValue("three", 50));
    setFour(getValue("four", 30));
    setFive(getValue("five", 0));
  }, []);

  function saveScale(e: any) {
    e.preventDefault();
    localStorage.setItem("one", String(Number(one) / 100));
    localStorage.setItem("two", String(Number(two) / 100));
    localStorage.setItem("three", String(Number(three) / 100));
    localStorage.setItem("four", String(Number(four) / 100));
    localStorage.setItem("five", String(Number(five) / 100));
    const visited = localStorage.getItem("visited");
    if (visited) {
      router.push("/");
    } else {
      localStorage.setItem("visited", "true");
      router.push("/tips");
    }
  }

  return (
    <main className="bg-base-100 text-black flex flex-col items-center gap-5 mt-10">
      <h2 className="text-l text-center text-wrap w-5/6">
        <strong className="text-xl">Please enter your scale below.</strong>{" "}
        <br /> Don&apos;t use the % symbol.
        <br /> Don&apos;t forget to save.
      </h2>
      <div className="overflow-x-auto flex justify-center">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left -translate-x-2">Grade</th>
              <th className="text-right -translate-x-2">%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-left">1</th>
              <td className="text-right">
                <div className="flex justify-end">
                  <input
                    type="number"
                    value={one}
                    onChange={(e) => setOne(e.target.value)}
                    className="input input-ghost w-full max-w-xs text-right"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-left">2</th>
              <td className="text-right">
                <div className="flex justify-end">
                  <input
                    type="number"
                    value={two}
                    onChange={(e) => setTwo(e.target.value)}
                    className="input input-ghost w-full max-w-xs text-right"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-left">3</th>
              <td>
                <div className="flex justify-end">
                  <input
                    type="number"
                    value={three}
                    onChange={(e) => setThree(e.target.value)}
                    className="input input-ghost w-full max-w-xs text-right"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-left">4</th>
              <td className="text-right">
                <div className="flex justify-end">
                  <input
                    type="number"
                    value={four}
                    onChange={(e) => setFour(e.target.value)}
                    className="input input-ghost w-full max-w-xs text-right"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-left">5</th>
              <td className="text-right">
                <div className="flex justify-end">
                  <input
                    type="number"
                    value={five}
                    onChange={(e) => setFive(e.target.value)}
                    className="input input-ghost w-full max-w-xs text-right"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-neutral" type="submit" onClick={saveScale}>
        Save
      </button>
    </main>
  );
}
