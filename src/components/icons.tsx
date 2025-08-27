
import { type SVGProps } from "react";

export const DileToolLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" {...props}>
        <text x="0" y="32" fontFamily="var(--font-headline), sans-serif" fontSize="30" fontWeight="bold" fill="currentColor">
            Offline Toolkit
        </text>
    </svg>
);
