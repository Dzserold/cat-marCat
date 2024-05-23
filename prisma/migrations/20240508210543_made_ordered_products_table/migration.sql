/*
  Warnings:

  - You are about to drop the column `ProductsList` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ProductsPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ProductsQuantity` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "ProductsList",
DROP COLUMN "ProductsPrice",
DROP COLUMN "ProductsQuantity";

-- CreateTable
CREATE TABLE "OrderedProducts" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "registeredPrice" INTEGER NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "OrderedProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderedProducts" ADD CONSTRAINT "OrderedProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProducts" ADD CONSTRAINT "OrderedProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
