import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon} from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            { id: 1, title: "Kazakh", imageSrc: "/kaz.svg" },
            { id: 2, title: "Math", imageSrc: "/math.svg" },
        ]);

        await db.insert(schema.units).values([
            { id: 1, courseId: 1, title: "Unit 1", description: "Learn the basics of Kazakh", order: 1 },
        ]);

        await db.insert(schema.lessons).values([
            { id: 1, unitId: 1, title: "Greeting", order: 1 },
            { id: 2, unitId: 1, title: "Nouns", order: 2 },
        ]);

        await db.insert(schema.challenges).values([
            { id: 1, lessonId: 1, type: "SELECT", question: "Which is 'hello' in Kazakh?", order: 1 },
            { id: 2, lessonId: 1, type: "SELECT", question: "What is the word for goodbye in Kazakh?", order: 2 },
            { id: 3, lessonId: 1, type: "ASSIST", question: "Hello", order: 3 },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 1, text: "Сәлем", correct: true, audioSrc: "/kaz_salem.mp3" },
            { challengeId: 1, text: "Сау бол", correct: false, audioSrc: "/kaz_saubol.mp3" },

            { challengeId: 2, text: "Сәлем", correct: false, audioSrc: "/kaz_salem.mp3" },
            { challengeId: 2, text: "Сау бол", correct: true, audioSrc: "/kaz_saubol.mp3" },

            { challengeId: 3, text: "Сәлем", correct: true, audioSrc: "/kaz_salem.mp3" },
            { challengeId: 3, text: "Сау бол", correct: false, audioSrc: "/kaz_saubol.mp3" },
        ]);

        console.log("Seeding finished");

    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};


main();