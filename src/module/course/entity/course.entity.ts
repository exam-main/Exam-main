import { Decimal } from '@prisma/client/runtime/library';
import { CourseLevel } from '@prisma/client';

export class CourseEntity {
  id: string;
  name: string;
  about: string;
  price: Decimal;
  banner: string;
  introVideo?: string;
  level: CourseLevel;
  published: boolean;
  updatedAt?: Date;
  createdAt: Date;
  categoryId: number;
  mentorId: number;
}