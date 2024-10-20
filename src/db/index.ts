import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

// NOTES (SEC 2):
// Creating a Prisma client object to use in our application to get access to database functions.
// By using this Db object we can create read update an delete items from out database in our case these items are snippets.