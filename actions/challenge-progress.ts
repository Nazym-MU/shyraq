"use server";
import { challenges, challengeProgress, userProgress } from "@/db/schema";
import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    };

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId))
    });

    const isPractice = !!existingChallengeProgress;
    
    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true
        }).where(eq(challengeProgress.id, existingChallengeProgress.id));

        await db.update(userProgress).set({
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId));

        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/learn/${lessonId}`);
        return;
    }

    await db.insert(challengeProgress).values({
        userId,
        challengeId,
        completed: true
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/learn/${lessonId}`);   
};