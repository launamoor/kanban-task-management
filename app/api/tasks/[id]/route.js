import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;

  try {
    // Fetch the task by its ID
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: {
        column: true, // Include related column details
        subtasks: true, // Include related subtasks
      },
    });

    if (task) {
      return new Response(JSON.stringify(task), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Task not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error fetching task", { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;

  try {
    const { columnId } = await request.json();

    if (!columnId) {
      return new Response("Column ID is required", { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { columnId: Number(columnId) },
    });

    return new Response(JSON.stringify(updatedTask), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response("Error updating task", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const task = await prisma.task.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({ message: "Task deleted successfully", task }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response("Error deleting task", { status: 500 });
  }
}
