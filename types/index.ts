export type Project = {
  id: number;
  name: string;
  description: string;
  created_user: number;
  date_posted: Date;
};

export type Notification = {
  id: number;
  type: string;
  created_at: Date;
};
