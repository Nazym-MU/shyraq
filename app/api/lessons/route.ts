import { NextResponse } from "next/server";
import { lessons } from "@/db/schema";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";

export const GET = async () => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.query.lessons.findMany();

    return NextResponse.json(data);
};

export const POST = async (req: Request) => {
    const admin = await isAdmin();
    if (!admin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();

    const data = await db.insert(lessons).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
};