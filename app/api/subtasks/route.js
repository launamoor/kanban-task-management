import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subtasks = await prisma.subtask.findMany();
    return new Response(JSON.stringify(subtasks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch subtasks" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
