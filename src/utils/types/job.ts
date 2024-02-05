import { Participant } from "./participant";

export interface JobProfile {
  id: number;
  participant: Participant;
  registeredByParticipant?: Participant;
  title: string;
  description: string;
  visits: number;
  reference1FullName?: string;
  reference1Phone?: string;
  reference1Relationship?: string;
  reference2FullName?: string;
  reference2Phone?: string;
  reference2Relationship?: string;
  jobCategories: JobCategory[];
  jobsAttachments: JobAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobProfile
  extends Omit<
    JobProfile,
    "id" | "visits" | "title" | "description" | "jobCategories" | "participant"
  > {
  reference1FullName?: string;
  reference1Phone?: string;
  reference1Relationship?: string;
  reference2FullName?: string;
  reference2Phone?: string;
  reference2Relationship?: string;
  jobCategoriesIds: number[];
}

export interface JobCategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface JobAttachment {
  id: number;
  title: string;
  description: string;
  image1Url?: string;
  image2Url?: string;
  image3Url?: string;
  image4Url?: string;
  jobProfileId?: number;
  participantId?: number;
  wasReviewed: boolean;
}

export interface CreateJobAttachment
  extends Omit<JobAttachment, "id" | "jobProfileId" | "participantId"> {
  title: string;
  description: string;
  image1Url?: string;
  image2Url?: string;
  image3Url?: string;
  image4Url?: string;
}
