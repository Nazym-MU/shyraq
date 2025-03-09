import { auth } from "@clerk/nextjs/server";

const allowedIds = [
  process.env.ADMIN_ID,
];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};