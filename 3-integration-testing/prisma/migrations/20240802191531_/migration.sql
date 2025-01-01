-- CreateEnum
CREATE TYPE "Operation" AS ENUM ('ADD', 'MUL');

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "operation" "Operation" NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
