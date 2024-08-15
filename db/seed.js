const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

  for (const boardData of data.boards) {
    const board = await prisma.board.create({
      data: {
        name: boardData.name,
        columns: {
          create: boardData.columns.map((column) => ({
            name: column.name,
            tasks: {
              create: column.tasks.map((task) => ({
                title: task.title,
                description: task.description,
                status: task.status,
                subtasks: {
                  create: task.subtasks.map((subtask) => ({
                    title: subtask.title,
                    isCompleted: subtask.isCompleted,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
    console.log(`Created board with id: ${board.id}`);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
