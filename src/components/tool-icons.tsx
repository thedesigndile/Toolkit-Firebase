
import { cn } from "@/lib/utils";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={cn("relative w-12 h-12 flex items-center justify-center", className)}>
        {children}
    </div>
);

const GradientDef = () => (
    <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--brand-blue-raw))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--brand-purple-raw))', stopOpacity: 1 }} />
        </linearGradient>
    </defs>
);

export const MergePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V18M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const SplitPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V12M12 12L9 15M12 12L15 15M12 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
    </IconWrapper>
);

export const CompressPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
         <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 14H13C12.4477 14 12 14.4477 12 15V17C12 17.5523 11.5523 18 11 18H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <path d="M15 18L13 16L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
    </IconWrapper>
);

export const PdfToWordIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M4 4C4 3.44772 4.44772 3 5 3H12L17 8V11" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 14H6C5.44772 14 5 14.4477 5 15V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V15C19 14.4477 18.5523 14 18 14H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M9 17H11.5M14 17H11.5M11.5 17V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M11 8H16" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const WordToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M16 4H6C5.44772 4 5 4.44772 5 5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M9 7H11.5M14 7H11.5M11.5 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M4 14C4 13.4477 4.44772 13 5 13H12L17 18V21C17 21.5523 16.5523 22 16 22H5C4.44772 22 4 21.5523 4 21V14Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 18H16" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToPowerpointIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <GradientDef />
            <path d="M4 4C4 3.44772 4.44772 3 5 3H12L17 8V11" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 8H16" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 15C5 14.4477 5.44772 14 6 14H18C18.5523 14 19 14.4477 19 15V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M9 17.5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const PowerpointToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <GradientDef />
            <path d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V10C19 10.5523 18.5523 11 18 11H6C5.44772 11 5 10.5523 5 10V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M9 7.5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M4 14C4 13.4477 4.44772 13 5 13H12L17 18V21C17 21.5523 16.5523 22 16 22H5C4.44772 22 4 21.5523 4 21V14Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 18H16" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToExcelIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M4 4C4 3.44772 4.44772 3 5 3H12L17 8V11" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 8H16" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 14C5 13.4477 5.44772 13 6 13H18C18.5523 13 19 13.4477 19 14V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M8.5 16H15.5M8.5 19H15.5M12 13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const ExcelToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
   <IconWrapper className={cn("text-brand-blue", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M5 4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V11C19 11.5523 18.5523 12 18 12H6C5.44772 12 5 11.5523 5 11V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M8.5 6H15.5M8.5 9H15.5M12 3V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M4 14C4 13.4477 4.44772 13 5 13H12L17 18V21C17 21.5523 16.5523 22 16 22H5C4.44772 22 4 21.5523 4 21V14Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 18H16" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const EditPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
         <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 13.5L15 11L18 14L15.5 16.5M12.5 13.5L9.5 16.5H12.5V13.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const PdfToJpgIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 18H14M12 12V18M10 12H12C13.1046 12 14 12.8954 14 14V14C14 15.1046 13.1046 16 12 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const SignPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 16.5L12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M8 12L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const WatermarkIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M12 18C14.2091 18 16 16.2091 16 14C16 12.5 14.4 10 12 10C9.6 10 8 12.5 8 14C8 16.2091 9.79086 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);


export const RotatePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M6 4H15L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V5C5 4.44772 5.44772 4 6 4Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 14H12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M12 14C12 11.7909 13.7909 10 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);
