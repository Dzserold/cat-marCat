/*
  Warnings:

  - You are about to drop the column `price` on the `OrderedProducts` table. All the data in the column will be lost.
  - You are about to drop the column `registeredPrice` on the `OrderedProducts` table. All the data in the column will be lost.
  - Added the required column `TotalPrice` to the `OrderedProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredProductPrice` to the `OrderedProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderedProducts" DROP COLUMN "price",
DROP COLUMN "registeredPrice",
ADD COLUMN     "TotalPrice" INTEGER NOT NULL,
ADD COLUMN     "registeredProductPrice" INTEGER NOT NULL;
