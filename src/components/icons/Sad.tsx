import React from "react";
import type { SVGProps } from "react";
import { Icon } from "./Lightbulb";

export default function SadIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 16 16"
      {...props}
    >
      <circle cx={6} cy={6} r={1} fill="black"></circle>
      <circle cx={10} cy={6} r={1} fill="black"></circle>
      <path
        fill="black"
        d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6"
      ></path>
      <path
        fill="black"
        d="M10.83 11.5c-.21 0-.4-.13-.47-.33a2.502 2.502 0 0 0-4.72 0c-.09.26-.38.4-.64.3a.493.493 0 0 1-.3-.64C5.19 9.43 6.52 8.5 8 8.5s2.81.94 3.3 2.33a.5.5 0 0 1-.47.67"
      ></path>
    </svg>
  );
}
