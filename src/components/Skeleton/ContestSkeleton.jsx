import React from "react";

const ContestSkeleton = () => {
    return (
        <div className="flex flex-col h-full overflow-hidden border border-base-300 rounded-2xl bg-base-100 shadow-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="relative h-48 bg-base-200"></div>

            {/* Content Skeleton */}
            <div className="flex flex-col p-6 space-y-4 grow">
                <div className="h-6 w-3/4 bg-base-200 rounded-md"></div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-base-200 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-base-200 rounded-md"></div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="h-4 w-20 bg-base-200 rounded-md"></div>
                    <div className="h-10 w-full bg-base-200 rounded-xl mt-4"></div>
                </div>
            </div>
        </div>
    );
};

export const ContestGridSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(count)].map((_, idx) => (
                <ContestSkeleton key={idx} />
            ))}
        </div>
    );
};

export default ContestSkeleton;
