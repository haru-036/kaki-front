export type Project = {
  id: number;
  name: string;
  created_user: number;
  latest_commit_image: string;
  description: string;
  created_at: Date;
  latest_commit_message: string;
  commit_count: number;
  project_member: [];
};

export type Notification = {
  id: number;
  type: string;
  created_at: Date;
  message: string;
};

export type User = {
  username: string;
  user_id: number;
  profile_image: string;
};

export type Comment = {
  id: number;
  content: string;
  created_at: Date;
  user: User;
};
