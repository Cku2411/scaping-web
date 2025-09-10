// import { withAccelerate } from "@prisma/extension-accelerate";
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
