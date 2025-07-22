export class UpdateMyProfileDto {
  phone?: string;
  fullName?: string;
  avatarUrl?: string;
  country?: string;
}

export class UpdateLastActivityDto {
  lessonId: string;
  pageUrl: string;
  updatedAt?: Date;
}

export class UpdatePhoneDto {
  phone: string;
}

export class UpdatePasswordDto {
  newPassword: string;
}

export class UpdateMentorProfileDto {
  experience: number;
  job: string;
  about: string;
  telegram?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}
