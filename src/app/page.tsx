"use client";
import { LightbulbIcon } from "@/components/icons/Lightbulb";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Response = {
  data: {
    grades: string[];
    mode: string;
  };
};

type Error = {
  response?: {
    data?: {
      error: string;
    };
  };
  message: string;
  code?: string;
};

type InputData = {
  image: File;
};

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [requestError, setRequestError] = useState<string>();
  const [selectedMode, setSelectedMode] = useState<number>(0);
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
    if (image) {
      sendMutation.mutate({ image });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMode(Number(e.target.value));
  }

  const sendMutation = useMutation<Response, Error, InputData>({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("mode", selectedMode.toString()); // Ensure mode is sent as a string

      return axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (res: Response) => {
      const { grades } = res.data;
      const queryString = `grades=${encodeURIComponent(
        JSON.stringify(grades)
      )}&mode=${res.data.mode}`;
      router.push(`/calculate?${queryString}`);
    },
    onError: (e) => {
      console.log(e);
      if (e.response?.data) {
        setRequestError(e.response.data.error);
      } else if (e.code === "ERR_NETWORK") {
        setRequestError(
          "Network error: The server might be down. It tends to shut down sometimes. Feel free to use the old version here."
        );
      } else if (e.message) {
        setRequestError(e.message);
      }
    },
  });

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

  return (
    <div className="flex flex-col items-center h-lvh bg-base-100">
      <section className="flex justify-end w-full h-1/3 ">
        <div className="flex justify-between w-full">
          <Link href={"/tips"}>
            <button className="btn btn-neutral ml-5 mt-5">
              <LightbulbIcon size={30} />
            </button>
          </Link>

          <Link href={"/edit"}>
            <button className="btn btn-neutral mr-5 mt-5">Edit</button>
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
          onChange={handleFileChange}
        />
        <select
          className="select select-bordered w-full max-w-xs text-black text-center mt-2"
          onChange={handleChange}
          value={selectedMode}
        >
          <option value={0} disabled>
            Select mode
          </option>
          <option value={1}>Points (9.5/10)</option>
          <option value={3}>% (95%)</option>
          <option value={2}>Grades (1)</option>
        </select>
        {requestError && (
          <div className="flex flex-col items-center gap-3 mt-5 w-5/6">
            <h4 className="text-red-600 text-center text-wrap">
              {requestError}
            </h4>
            {requestError.includes("Network error") && (
              <Link href={"/old"}>
                <button className="btn btn-neutral">Old version</button>
              </Link>
            )}
          </div>
        )}
        <div className="h-1/2 flex flex-col justify-center items-center">
          <div className="flex items-center gap-2">
            <Link href={"/history"}>
              <button className="btn btn-neutral">History</button>
            </Link>
            <button
              className="btn btn-neutral"
              type="submit"
              disabled={!image || selectedMode === 0 || sendMutation.isPending}
            >
              {sendMutation.isPending ? "Recognizing" : "Submit"}
            </button>
          </div>

          {sendMutation.isPending && (
            <h2 className="text-black text-sm mt-3 text-center text-wrap">
              This may take up to 30 second. Please be patient.
            </h2>
          )}
        </div>
      </form>
    </div>
  );
}
