import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const instructorRouter = createTRPCRouter({
  getInstructor: protectedProcedure.query(async ({ ctx }) => {
    // get all instructors
    const instructor = await ctx.prisma.instructor.findMany();

    return instructor;
  }),
});
