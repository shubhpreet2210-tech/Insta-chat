export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio?: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  imageUrl: string;
  caption: string;
  createdAt: any; // Firestore Timestamp
  likesCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: any; // Firestore Timestamp
}

export interface ChatSession {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: any;
}
