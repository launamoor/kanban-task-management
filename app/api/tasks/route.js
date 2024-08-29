import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/tasks
export async function GET(req) {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        subtasks: true,
      },
    });

    // Return the tasks as JSON
    return new Response(JSON.stringify(tasks), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response("Error fetching tasks", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, description, columnId, subtasks, status } = await req.json();

    // Validate input
    if (!title || !description || !columnId || !status) {
      return new Response(
        JSON.stringify({
          error: "Title, description, columnId, and status are required.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create the new task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        columnId,
        status,
        subtasks: {
          create: subtasks.map((subtask) => ({
            title: subtask.title,
            isCompleted: subtask.isCompleted,
          })),
        },
      },
      include: {
        subtasks: true,
      },
    });

    // Return the newly created task as JSON
    return new Response(JSON.stringify(newTask), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response("Error creating task", { status: 500 });
  }
}
