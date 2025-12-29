"use client"
import { itemVariants, themes, timeAgo } from "@/lib/constants";
import { Projects } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ThumnailPreview from "./thumbnail-preview";

type Props = {
    projectId: Projects['id'];
    title: Projects['title'];
    src: Projects['thumbnail'];
    createdAt: Projects['createdAt'];
    slideData: Projects['slides'];
    isDeleted: Projects['isDeleted'];
    themeName: Projects['themeName'];
}

const ProjectCard = ({
    projectId,
    title,
    createdAt,
    slideData,
    isDeleted,
    themeName
}: Props) => {
    const { setSlides } = useSlideStore();
    const router = useRouter();

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)));
        router.push(`/presentation/${projectId}`);
    }

    const theme = themes.find((t) => t.name === themeName) || themes[0];
    const slideCount = Array.isArray(slideData) ? slideData.length : 0;

    return (
        <motion.div 
            variants={itemVariants} 
            className={`group relative flex flex-col gap-y-6 rounded-[32px] p-6 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                ${!isDeleted && 'hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] hover:scale-[1.01] hover:-translate-y-3'}
                border border-transparent ${!isDeleted && 'hover:border-black/[0.05]'}`}
        >
            {/* Massive Cinematic Thumbnail Container */}
            <div 
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] cursor-pointer bg-[#fbfbfd] ring-1 ring-black/[0.04] shadow-md transition-all duration-700 group-hover:shadow-xl"
                onClick={handleNavigation}
            >
                <div className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110">
                    <ThumnailPreview 
                        theme={theme}
                        slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                    />
                </div>
                
                {/* Apple Pro Display-style Gloss */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Elevated Info Section */}
            <div className="px-3 flex flex-col gap-y-3">
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                         <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                            Recently Edited
                        </p>
                        <div className="bg-[#f5f5f7] px-3 py-1 rounded-full">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">
                                {theme.name}
                            </p>
                        </div>
                    </div>
                    
                    <h3 className="font-semibold text-[22px] leading-tight tracking-tight text-[#1d1d1f] line-clamp-2 pt-1">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center justify-between border-t border-black/[0.03] pt-4">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                             {/* Mock avatar for 'Collaborative' Apple look */}
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                        </div>
                        <p className="text-[15px] font-medium text-[#86868b]" suppressHydrationWarning>
                            {timeAgo(createdAt)}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                        <span className="text-[15px] font-semibold text-[#1d1d1f]">{slideCount}</span>
                        <span className="text-[15px] text-[#86868b]">slides</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectCard;