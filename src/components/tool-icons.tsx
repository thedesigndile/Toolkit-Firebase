
import { cn } from "@/lib/utils";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={cn("relative w-12 h-12 flex items-center justify-center", className)}>
        {children}
    </div>
);

export const MergePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-red-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const SplitPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-orange-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M12 18V12M12 12L9 15M12 12L15 15M12 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconWrapper>
);

export const CompressPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-green-500", className)}>
         <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M20 8H14V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 14H13C12.4477 14 12 14.4477 12 15V17C12 17.5523 11.5523 18 11 18H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 18L13 16L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconWrapper>
);

export const PdfToWordIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-blue-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4C4 2.89543 4.89543 2 6 2H13.5L18 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
            <path d="M13 2.5V7.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 15.5V20C20 21.1046 19.1046 22 18 22H11C9.89543 22 9 21.1046 9 20V14C9 12.8954 9.89543 12 11 12H16.5L20 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
            <path d="M12 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    </IconWrapper>
);

export const WordToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-blue-600", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 15.5V20C20 21.1046 19.1046 22 18 22H11C9.89543 22 9 21.1046 9 20V14C9 12.8954 9.89543 12 11 12H16.5L20 15.5Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 4C4 2.89543 4.89543 2 6 2H13.5L18 6.5V9" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 2.5V7.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToPowerpointIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper className={cn("text-orange-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4C4 2.89543 4.89543 2 6 2H13.5L18 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
            <path d="M13 2.5V7.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12H18C19.1046 12 20 12.8954 20 14V20C20 21.1046 19.1046 22 18 22H9C7.89543 22 7 21.1046 7 20V14C7 12.8954 7.89543 12 9 12Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
            <path d="M11 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11 19H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    </IconWrapper>
);

export const PowerpointToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper className={cn("text-orange-600", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H18C19.1046 12 20 12.8954 20 14V20C20 21.1046 19.1046 22 18 22H9C7.89543 22 7 21.1046 7 20V14C7 12.8954 7.89543 12 9 12Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
            <path d="M11 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11 19H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 4C4 2.89543 4.89543 2 6 2H13.5L18 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
            <path d="M13 2.5V7.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToExcelIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-green-600", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4C4 2.89543 4.89543 2 6 2H13.5L18 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
            <path d="M13 2.5V7.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 12H17C18.1046 12 19 12.8954 19 14V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V14C5 12.8954 5.89543 12 7 12Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
            <path d="M9 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    </IconWrapper>
);

export const ExcelToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
   <IconWrapper className={cn("text-green-700", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12H17C18.1046 12 19 12.8954 19 14V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V14C5 12.8954 5.89543 12 7 12Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
            <path d="M9 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 4C4 2.89543 4.89543 2 6 2H13.5L18 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
            <path d="M13 2.5V7.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const EditPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-purple-500", className)}>
         <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M12.5 13.5L15 11L18 14L15.5 16.5M12.5 13.5L9.5 16.5H12.5V13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToJpgIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-yellow-500", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.1"/>
            <path d="M20 8H14V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 12H12C13.1046 12 14 12.8954 14 14V14C14 15.1046 13.1046 16 12 16H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const SignPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-indigo-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M10 16.5L12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const WatermarkIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-cyan-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
             <path d="M12 18C14.2091 18 16 16.2091 16 14C16 12.5 14.4 10 12 10C9.6 10 8 12.5 8 14C8 16.2091 9.79086 18 12 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);


export const RotatePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-sky-500", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M16 14H12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C14.2091 22 16 20.2091 16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </IconWrapper>
);

    
