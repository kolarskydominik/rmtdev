export type JobItemType = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  relevaceScore: number;
  daysAgo: number;
};

export type JobItemTypeExpanded = JobItemType & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};
