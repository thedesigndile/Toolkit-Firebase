import { type SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8.5L14 9Z" />
    <path d="M18 22h-8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2Z" />
  </svg>
);


export const ILovePdfLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" {...props}>
        <text x="0" y="32" fontFamily="Verdana, sans-serif" fontSize="30" fontWeight="bold" fill="black">
            I
        </text>
        <g transform="translate(20, 0)">
            <path d="M20 8 C25 0, 35 0, 40 8 C45 16, 20 28, 20 28 C20 28, -5 16, 0 8 C5 0, 15 0, 20 8 Z" fill="#e53e3e"/>
            <path d="M28 8 L38 8 L38 18 L28 8 Z" fill="white" stroke="lightgray" strokeWidth="0.5" />
        </g>
        <text x="70" y="32" fontFamily="Verdana, sans-serif" fontSize="30" fontWeight="bold" fill="black">
            PDF
        </text>
    </svg>
);
