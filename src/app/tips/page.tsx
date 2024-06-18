import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center bg-base-100 text-black mt-8 text-center text-l text-wrap">
      <ul className="flex flex-col gap-4 w-5/6">
        <li className="flex flex-col items-center gap-1">
          <h3>1. Please upload a screenshot like this:</h3>
          <Image src="/Inkedznamky.jpg" height={350} width={350} alt="Znamky" />
          <h3>
            % are also supported (e.g 50%, 99%) and grades (e.g 1,4,3) are WIP
          </h3>
        </li>
        <li>
          <h3>
            2. If you want to add weight to grades, after the scanning add{" "}
            <strong>&apos;@0.25&apos;</strong> (0.25 is the weight) to the text.{" "}
            <br /> So the result should look like this for example: <br />
            <strong>10/10@0.5 or 60%@0.75</strong>
          </h3>
        </li>
        <li>
          <h3>3. Default weight is 1</h3>
        </li>
        <li>
          <h3>
            4. Don&apos;t add % in the edit tab. A good example is the default
            values provided.
          </h3>
        </li>
        <li>
          <h3>
            5. If the backend server is down feel free to use the old version{" "}
            <a className="link" href="/old">
              here
            </a>
          </h3>
        </li>
        <li>
          <h3>
            6. When typing decimal numbers like 9.5 use <strong>dots</strong>{" "}
            and <strong>NOT commas</strong> (9.5 = right; 9,5 = wrong)
          </h3>
        </li>
      </ul>
      <Link href={"/"}>
        <button className="btn btn-neutral mt-2">Home</button>
      </Link>
    </main>
  );
}
