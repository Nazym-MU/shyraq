"use client";
import { challenges, challengeOptions } from "@/db/schema";
import { Header } from "./header";
import { useState } from "react";

type Props = {
    initialPercentage: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
};

export const Quiz = ({ initialPercentage, initialLessonId, initialLessonChallenges }: Props) => {
    const [percentage, setPercentage] = useState(initialPercentage);

    return (
        <>
            <Header percentage={percentage} />
        </>
    );
}