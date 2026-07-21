export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: string
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage: ChatMessage
  unreadCount: number
  updatedAt: string
}