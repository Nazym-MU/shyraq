"use client";
import { challenges, challengeOptions } from "@/db/schema";
import { Header } from "./header";
import { toast } from "sonner";
import Confetti from "react-confetti";
import { useState, useTransition } from "react";
import Image from "next/image";
import { useAudio, useWindowSize, useMount } from "react-use";
import { usePracticeModal } from "@/store/use-practice-modal";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { ResultCard } from "./result-card";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useRouter } from "next/navigation";

type Props = {
    initialPercentage: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
};

export const Quiz = ({ initialPercentage, initialLessonId, initialLessonChallenges }: Props) => {
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const { width, height } = useWindowSize();
    const router = useRouter();
    const [finishAudio, _f, finishControls] = useAudio({ src: "/finish.mp3", autoPlay: true });
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
    const [lessonId] = useState(initialLessonId);
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" });
    const [pending, startTransition] = useTransition();
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "incorrect" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "incorrect") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) return;

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);
                }
            ).catch(() => toast.error("Something went wrong. Please try again."));
        });

        } else {
            incorrectControls.play();
            setStatus("incorrect");
        };
    };

    if (!challenge) {
        return (
            <>
            {finishAudio}
            <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} width={width} height={height} />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image src="/finish.svg" alt="Finish" className="hidden lg:block" height={100} width={100} />
                    <Image src="/finish.svg" alt="Finish" className="block lg:hidden" height={50} width={50} />
                    <div suppressHydrationWarning>
                        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                            Great job! <br /> You have completed the lesson.
                        </h1>
                    </div>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard variant="points" value={challenges.length * 10} />
                    </div>
                </div>
                <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")} />
            </>
        );
    }

    const title = challenge.type === "ASSIST" ? "Select the correct answer" : challenge.question;

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header percentage={percentage} />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge options={options} onSelect={onSelect} status={status} selectedOption={selectedOption} disabled={pending} type={challenge.type} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer disabled={pending || !selectedOption} status={status} onCheck={onContinue} />
        </>
    );
}