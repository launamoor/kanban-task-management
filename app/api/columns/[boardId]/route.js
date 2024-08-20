import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const boardId = url.searchParams.get("boardId");

  if (!boardId) {
    return new Response("BoardID is required", { status: 400 });
  }

  try {
    const columns = await prisma.column.findMany({
      where: { boardId: Number(boardId) },
      include: {
        tasks: true, // Include related tasks if needed
      },
    });

    return new Response(JSON.stringify(columns), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching columns:", error);
    return new Response("Failed to fetch columns", { status: 500 });
  }
}
