import { Buffer } from 'buffer';

export interface User {
  _id: string,
  username: string;
  password: string;  // TODO remove this
  email: string;
  screen_name: string;
  avatar: Buffer
  is_online: boolean;
  friends: string[]
}

export interface Message {
  _id: string,
  content: string,
  sender: string,
  date_time: string,
  is_read: boolean
}

export interface ConversationType {
  _id: string,
  userids: string[],
  messages: Message[]
}

export interface Conversation {
  friend_id: string,
  friend_name: string,
  is_online: boolean,
  friend_avatar: Buffer,
  is_read: boolean, 
  conversation: ConversationType
}

// current active conversation state
export interface ConvState {
  friendName: string,
  isOnline: boolean, 
  friendAvatar: Buffer | undefined
  messages: Message[],
  convId: string,
}