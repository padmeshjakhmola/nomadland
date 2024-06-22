export interface UserData {
  already_exist: string;
  id: number;
}
export interface User {
  name: string;
  email: string;
  username: string | null;
  profile_picture: string | null;
}

export interface Post {
  id: number;
  image: string | null;
  title: string;
  description: string;
  link: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  User: User;
}
