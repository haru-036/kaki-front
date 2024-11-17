export type Project = {
  id: number;
  name: string;
  description: string;
  created_user_id: number;
  created_username: string;
  created_user_profile_image: string;
  latest_commit_image: string;
  created_at: Date;
  latest_commit_message: string;
  commit_count: number;
  project_member: [];
};

export type Notification = {
  id: number;
  type: string;
  created_at: Date;
  from_user: {
    username: string;
    profile_image: string;
    user_id: number;
  };
  project: {
    name: string;
    project_id: number;
  };
  commit: {
    commit_id: number;
    message: number;
    image: number;
  };
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
