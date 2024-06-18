import Link from "next/link";

type Card = {
  grades: string[];
  mode: string;
  nextPoints: string;
  nextWeight: string;
  wanted: string;
};

export default function HistoryCard(props: Card) {
  let grades: any = props.grades;
  if (props.grades.length > 4) {
    grades = props.grades.slice(0, 4);
    grades[4] = "...";
    grades = grades.join(", ");
  }

  return (
    <Link
      href={`/calculate?grades=${props.grades}&mode=${props.mode}&desired=${props.wanted}&secondValue=${props.nextPoints}`}
    >
      <div className="text-white bg-neutral p-6 rounded-lg ">
        <h4>{grades}</h4>
        {props.mode != "2" && (
          <h4>
            Next {props.mode == "1" ? "points" : "weight"}: {props.nextPoints}
          </h4>
        )}
        <h4>Grade: {props.wanted}</h4>
      </div>
    </Link>
  );
}
