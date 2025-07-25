/*
  Warnings:

  - You are about to drop the column `answer` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `variantA` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `variantB` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `variantC` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `variantD` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `title` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "answer",
DROP COLUMN "question",
DROP COLUMN "variantA",
DROP COLUMN "variantB",
DROP COLUMN "variantC",
DROP COLUMN "variantD",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ExamQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "variantA" TEXT NOT NULL,
    "variantB" TEXT NOT NULL,
    "variantC" TEXT NOT NULL,
    "variantD" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "examId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
