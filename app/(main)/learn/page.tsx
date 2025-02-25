import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress, getUnits } from "@/db/queries";
import { Unit } from "./unit";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const unitsData = getUnits();

    const [ userProgress, units ] = await Promise.all([ userProgressData, unitsData ]);
    
    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
           <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} streak={userProgress.streak} points={userProgress.points} hasStreak={false} />
           </StickyWrapper>
           <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit id={unit.id} order={unit.order} description={unit.description} title={unit.title} lessons={unit.lessons} activeLesson={undefined} activeLessonPercentage={0} />
                    </div>
                ))}
           </FeedWrapper>
        </div>
    );
}
export default LearnPage;