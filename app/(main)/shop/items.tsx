"use client";

type Props = {
    points: number;
    streak: number;
    hasStreak: boolean;
};

// TODO: Implement purchase of freeze and new badges

export const Items = ({ points, streak, hasStreak }: Props) => {
    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            </div>
        </ul>
    )
};