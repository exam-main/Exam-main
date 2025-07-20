/*
  Warnings:

  - You are about to drop the column `lessonBolimId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `bolimId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `LessonBoLim` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lessonGroupId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_bolimId_fkey";

-- DropForeignKey
ALTER TABLE "LessonBoLim" DROP CONSTRAINT "LessonBoLim_courseId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "lessonBolimId",
ADD COLUMN     "lessonGroupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "bolimId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "LessonBoLim";

-- CreateTable
CREATE TABLE "LessonGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "LessonGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonGroup" ADD CONSTRAINT "LessonGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LessonGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonGroupId_fkey" FOREIGN KEY ("lessonGroupId") REFERENCES "LessonGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_lessonGroupId_fkey" FOREIGN KEY ("lessonGroupId") REFERENCES "LessonGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
