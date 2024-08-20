import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const columns = await prisma.column.findMany({
      include: {
        tasks: true, // Include tasks related to each column, if needed
      },
    });
    return new Response(JSON.stringify(columns), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error fetching columns", { status: 500 });
  }
}
