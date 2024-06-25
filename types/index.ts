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

export interface UserData {
  name: string;
  email: string;
  profile_picture: string;
  clerk_userId: string;
  username: string;
}

export interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  User: User;
}
export interface CommentFormProps {
  postId: number;
  userData: UserData;
  onCommentAdded: (newComment: Comment) => void; 
}
