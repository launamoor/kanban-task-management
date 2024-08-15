import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });
    return new Response(JSON.stringify(boards), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error fetching boards", { status: 500 });
  }
}
