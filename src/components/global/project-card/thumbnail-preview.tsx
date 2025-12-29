"use client"
import ScaledPreview from "@/app/(protected)/presentation/[presentationId]/_components/editor-sidebar/left-sidebar/ScaledPreview";
import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type Props = {
    slide: Slide;
    theme: Theme;
}

const ThumnailPreview = ({ slide, theme }: Props) => {
    return (
        <div 
            className={cn(
                "relative w-full aspect-[16/9] rounded-[12px] overflow-hidden",
                "ring-1 ring-black/[0.08] ring-inset", // Subtle border
                "transition-all duration-500 ease-in-out"
            )}
            style={{
                fontFamily: theme.fontFamily,
                color: theme.accentColor,
                backgroundColor: theme.slideBackgroundColor,
                backgroundImage: theme.gradientBackground,
            }}
        >
            {slide ? (
                /* Container for the 3x scaled content */
                <div className="relative w-full h-full p-[4%]"> 
                    <div 
                        className="w-[300%] h-[300%] origin-top-left"
                        style={{ transform: 'scale(1)' }}
                    >
                        <ScaledPreview slide={slide} isActive={false} index={0} />
                    </div>
                </div>
            ) : (
                /* Apple-style minimalist empty state */
                <div className="w-full h-full bg-[#F5F5F7] flex flex-col justify-center items-center gap-2">
                    <div className="p-3 rounded-full bg-white shadow-sm">
                        <ImageIcon className="w-5 h-5 text-[#86868b] stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-medium text-[#86868b] uppercase tracking-tight">
                        No Content
                    </span>
                </div>
            )}

            {/* Subtle inner vignette to make the edges feel premium */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]" />
        </div>
    );
};

export default ThumnailPreview;