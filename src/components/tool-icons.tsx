import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
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
            <path d="M8 12h8m-4 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);


export const SplitPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M12 10v4m0 0l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 7V6m0 0l-1.5 1.5M12 6l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const CompressPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
         <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 17.5v-2.5h2.5M16 8.5v2.5h-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <path d="M8 17.5L12 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <path d="M16 8.5L12 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
    </IconWrapper>
);

export const PdfToWordIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const WordToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12v6l2-2 2 2v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const PdfToPowerpointIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12h3m3 0h-3m0 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const PowerpointToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12h3a2 2 0 1 1 0 4h-3v-4Zm0 0v4m0-4h1.5m1.5 0h-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const PdfToExcelIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 11l-4 6m0-6l4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const ExcelToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
   <IconWrapper className={cn("text-brand-blue", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H9v-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const EditPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
         <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.5 6.5L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M11 9l-6 6v3h3l6-6-3-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const PdfToJpgIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
       <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 18v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const SignPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12.5h3m2 0h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M9 16.5c3.582-3 7-3 7-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const WatermarkIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M12 17.5a4.5 4.5 0 0 0 2.6-8.25L12 5.5 9.4 9.25A4.5 4.5 0 0 0 12 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);


export const RotatePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-brand-blue", className)}>
        <svg {...props} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDef />
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L13.5 2H18Z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 14h-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M16 18a4 4 0 0 0-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </IconWrapper>
);

export const LinkIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper className={cn("text-muted-foreground", className)}>
        <Link {...props} width="48" height="48" />
    </IconWrapper>
)
