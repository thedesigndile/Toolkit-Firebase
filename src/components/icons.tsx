
import { type SVGProps } from "react";

export const DileToolLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="32" height="32" rx="8" fill="currentColor"/>
        <path d="M18 12L12 22L15 25L21 15L18 12Z" fill="white" fillOpacity="0.5"/>
        <path d="M14 12L20 22L17 25L11 15L14 12Z" fill="white"/>
    </svg>
);
