-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "ProductsList" TEXT[],
ADD COLUMN     "ProductsPrice" INTEGER[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "actualPrice" INTEGER NOT NULL DEFAULT 100;
