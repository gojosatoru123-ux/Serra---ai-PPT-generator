import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Project from "@/components/global/Projects";
import { Button } from "@/components/ui/button";
import { sampleProjects } from "@/lib/testing";
import { Projects } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
    const allProjects = await getAllProjects();
    // const sampleProject:Projects = sampleProjects;
    return (
        <>
            <div className="w-full flex flex-col relative gap-6 p-4">
                <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex flex-col items-start">
                        <h1 className="text-6xl font-extrabold dark:text-primary-backdrop-blur-lg">Projects</h1>
                        <p className="text-2xl font-semibold text-accent-foreground/20 dark:text-secondary">All of your work in one place</p>
                    </div>
                    <Link
                        href="/create-page"
                        className="relative flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:bg-zinc-800 hover:shadow-primary-500/20 hover:-translate-y-1 active:scale-95 dark:bg-white dark:text-zinc-950"
                    >
                        <span className="relative z-10 text-2xl">Start Building</span>
                        <ArrowRight className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </Link>
                </div>
                <Project projects={allProjects.data ?? []} />
            </div>
        </>
    )
}
export default DashboardPage;