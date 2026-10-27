-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "image" VARCHAR(255),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
