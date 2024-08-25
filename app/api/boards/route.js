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

export async function POST(request) {
  try {
    const { name, columns } = await request.json();

    if (!name || !Array.isArray(columns)) {
      return new Response("Invalid data", { status: 400 });
    }

    // Create the new board
    const newBoard = await prisma.board.create({
      data: {
        name,
        columns: {
          create: columns.map((column) => ({
            name: column.name || "Unnamed Column", // Default to "Unnamed Column"
            color: column.color || "#635fc7", // Provide a default color
            tasks: {
              create: column.tasks || [],
            },
          })),
        },
      },
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

    return new Response(JSON.stringify(newBoard), {
      headers: { "Content-Type": "application/json" },
      status: 201, // Status code for created resource
    });
  } catch (error) {
    console.error("Error creating board:", error);
    return new Response("Error creating board", { status: 500 });
  }
}
