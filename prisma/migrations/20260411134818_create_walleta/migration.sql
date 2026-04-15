-- CreateTable
CREATE TABLE "removeTokens" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(300) NOT NULL,
    "expired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "removeTokens_pkey" PRIMARY KEY ("id")
);
