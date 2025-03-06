import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import { Quiz } from '../quiz';

type Props = {
    params: {
        lessonId: number;
    };
};

const LessonIdPage = async ({params}: Props) => {
    const lessonData = getLesson(params.lessonId);
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!lesson || !userProgress) {
        return redirect('/learn');
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        // TODO: add streak
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialPercentage={initialPercentage} /> 
    );
};

export default LessonIdPage;