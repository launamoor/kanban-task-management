import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch a specific board by ID
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

// Delete a specific board by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedBoard = await prisma.board.delete({
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

    return new Response(JSON.stringify(deletedBoard), {
      headers: { "Content-Type": "application/json" },
      status: 200, // Status code for successful deletion
    });
  } catch (error) {
    console.error("Error deleting board:", error);
    return new Response("Error deleting board", { status: 500 });
  }
}
