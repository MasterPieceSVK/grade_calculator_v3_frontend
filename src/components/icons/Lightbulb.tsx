import React from "react";
import type { SVGProps } from "react";

export type Icon = {
  size: number;
} & SVGProps<SVGSVGElement>;

export function LightbulbIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 21.154q-.69 0-1.201-.463t-.607-1.152h3.616q-.096.69-.607 1.152T12 21.154m-3.5-3.385v-1h7v1zM8.558 15q-1.417-.929-2.238-2.356T5.5 9.5q0-2.721 1.89-4.61T12 3t4.61 1.89T18.5 9.5q0 1.717-.82 3.144T15.442 15z"
      ></path>
    </svg>
  );
}
