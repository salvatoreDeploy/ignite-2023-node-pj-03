/* eslint-disable prettier/prettier */
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import "dotenv/config";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

// 'postgresql://docker:docker@localhost:5432/apicheckacademy?schema=public'

const prisma = new PrismaClient();

function generationDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL enviroment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();

    // console.log(generationDatabaseUrl(schema));

    const databaseURL = generationDatabaseUrl(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
        await prisma.$disconnect();
      },
    };
  },
};
