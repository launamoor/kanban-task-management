import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const board = await prisma.board.findUnique({
      where: { id: Number(id) },
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

    if (board) {
      return new Response(JSON.stringify(board), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Board not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error fetching board", { status: 500 });
  }
}
