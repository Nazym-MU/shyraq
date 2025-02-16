import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
           <StickyWrapper>
                <UserProgress activeCourse={{ title: "Kazakh", imageSrc: "/kaz.svg" }} streak={0} points={100} hasStreak={false} />
           </StickyWrapper>
           <FeedWrapper>
                <Header title="Kazakh" />
           </FeedWrapper>
        </div>
    );
}
export default LearnPage;