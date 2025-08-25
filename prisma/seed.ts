// Example: How to seed the Fruit table with mock data using Prisma

// import { PrismaClient } from "@prisma/client";
// import { randomUUID } from "crypto";
// const client = new PrismaClient();

// const fruits = [
//   { id: randomUUID(), name: "Apple", color: "Red" },
//   { id: randomUUID(), name: "Banana", color: "Yellow" },
//   { id: randomUUID(), name: "Grape", color: "Purple" },
// ];

// async function main() {
//   // await Promise.all(fruits.map(fruit => client.fruit.create({ data: fruit })));
//   // console.log("Seeded fruits!");
// }

// main()
//   .catch(console.error)
//   .finally(() => client.$disconnect());

/**
 * How this works:
 * - When you run `npx prisma migrate reset` or your project's `npm run db:reset` command,
 * - Prisma will automatically run your seed script after resetting and migrating the database.
 * - Uncomment the code to use it as your actual seed script.
 *
 * For more info: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
 */