import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { courses } from '@/db/schema';

type Props = {
    activeCourse: typeof courses.$inferSelect;
    streak: number;
    points: number;
    hasStreak: boolean;
}

export const UserProgress = ({activeCourse, points, streak, hasStreak }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image src={activeCourse.imageSrc} alt={activeCourse.title} className="rounded-md border" width={32} height={32} />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src={hasStreak ? "/streak_active.svg":"/streak_inactive.svg"} alt="Streak" width={22} height={22} className="mr-2"/>
                    {streak}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-yellow-500">
                    <Image src="/points.svg" alt="Points" width={28} height={28} className="mr-2"/>
                    {points}
                </Button>
            </Link>
        </div>
    );
};