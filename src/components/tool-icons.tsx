import { cn } from "@/lib/utils";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const IconWrapper: React.FC<{ bgColor: string, children: React.ReactNode, className?: string }> = ({ bgColor, children, className }) => (
    <div className={cn("relative w-10 h-10 flex items-center justify-center", className)}>
        {children}
    </div>
);

export const MergePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-red-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#F87171"/>
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#FCA5A5"/>
            <path d="M24 18L24 24M21 21H27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const SplitPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-orange-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#F97316"/>
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#FB923C"/>
            <path d="M28 25L24 21L20 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 17L24 21L28 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const CompressPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-green-500" className={className}>
         <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#22C55E"/>
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#4ADE80"/>
            <path d="M28 20H20M24 16V24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToWordIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-blue-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#3B82F6"/>
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#60A5FA"/>
            <text x="14" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">P</text>
            <path d="M28 17L24 21L28 25M24 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const WordToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-blue-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#3B82F6"/>
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#60A5FA"/>
            <text x="26" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">W</text>
            <path d="M12 17L16 21L12 25M16 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToPowerpointIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper bgColor="bg-orange-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#F97316"/>
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#FB923C"/>
            <text x="14" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">P</text>
            <path d="M28 17L24 21L28 25M24 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PowerpointToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <IconWrapper bgColor="bg-orange-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#F97316"/>
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#FB923C"/>
            <text x="26" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">P</text>
            <path d="M12 17L16 21L12 25M16 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToExcelIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-green-500" className={className}>
       <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#16A34A"/>
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#22C55E"/>
            <text x="14" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">P</text>
            <path d="M28 17L24 21L28 25M24 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const ExcelToPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
   <IconWrapper bgColor="bg-green-500" className={className}>
       <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#16A34A"/>
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#22C55E"/>
            <text x="26" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">X</text>
            <path d="M12 17L16 21L12 25M16 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const EditPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-purple-500" className={className}>
         <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="11" width="18" height="18" rx="4" fill="#A855F7"/>
            <path d="M23 16L24.5 17.5M18 25L16 23L22 17L23.5 18.5L18 24V25H17Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const PdfToJpgIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-yellow-500" className={className}>
       <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="17" y="11" width="18" height="18" rx="4" fill="#EAB308"/>
            <rect x="5" y="11" width="18" height="18" rx="4" fill="#FACC15"/>
            <text x="14" y="23" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">P</text>
            <path d="M28 17L24 21L28 25M24 21H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const SignPdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-indigo-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="11" width="18" height="18" rx="4" fill="#6366F1"/>
            <path d="M17 23L20 20L23 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 20V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);

export const WatermarkIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-cyan-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="11" width="18" height="18" rx="4" fill="#06B6D4"/>
             <path d="M20 16C21.1046 16 22 16.8954 22 18C22 19.5 20 22 20 22C20 22 18 19.5 18 18C18 16.8954 18.8954 16 20 16Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </IconWrapper>
);


export const RotatePdfIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <IconWrapper bgColor="bg-sky-500" className={className}>
        <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="11" width="18" height="18" rx="4" fill="#0EA5E9"/>
            <path d="M24 17H20V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 25C22.2091 25 24 23.2091 24 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </IconWrapper>
);
