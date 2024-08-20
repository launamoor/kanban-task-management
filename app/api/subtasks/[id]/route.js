import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH request handler
export async function PATCH(req, { params }) {
  const { id } = params;
  const { isCompleted } = await req.json(); // Get the request body data

  try {
    const updatedSubtask = await prisma.subtask.update({
      where: { id: Number(id) },
      data: { isCompleted },
    });
    return new Response(JSON.stringify(updatedSubtask), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update subtask" }), {
      status: 500,
    });
  }
}
