import { ChatMessage, Conversation } from '@/types/chat'

const STORAGE_KEY = 'chat_messages'
const CONVERSATIONS_KEY = 'chat_conversations'

class ChatService {
  private fetchMessages(): ChatMessage[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  private saveMessages(messages: ChatMessage[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }

  private loadConversations(): Conversation[] {
    try {
      return JSON.parse(localStorage.getItem(CONVERSATIONS_KEY) || '[]')
    } catch {
      return []
    }
  }

  private saveConversations(conversations: Conversation[]) {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations))
  }

  async getMessages(userId1: string, userId2: string): Promise<ChatMessage[]> {
    const messages = this.fetchMessages()
    return messages.filter(
      m => (m.senderId === userId1 && m.receiverId === userId2) ||
           (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      receiverId,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    }

    const messages = this.fetchMessages()
    messages.push(message)
    this.saveMessages(messages)

    const conversations = this.loadConversations()
    const existingConv = conversations.find(c => 
      c.participants.includes(senderId) && c.participants.includes(receiverId)
    )

    if (existingConv) {
      existingConv.lastMessage = message
      existingConv.updatedAt = message.createdAt
      if (message.receiverId !== senderId) {
        existingConv.unreadCount++
      }
    } else {
      conversations.push({
        id: `conv-${Date.now()}`,
        participants: [senderId, receiverId],
        lastMessage: message,
        unreadCount: 0,
        updatedAt: message.createdAt,
      })
    }

    this.saveConversations(conversations)
    return message
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    const conversations = this.loadConversations()
    return conversations
      .filter(c => c.participants.includes(userId))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    const conversations = this.loadConversations()
    const conv = conversations.find(c => c.id === conversationId)
    if (conv) {
      conv.unreadCount = 0
      this.saveConversations(conversations)
    }
  }
}

export const chatService = new ChatService()