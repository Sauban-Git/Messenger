export interface UserInfoApi {
  id: string
  name: string
  phone: string
}

export interface MessageApi {
  id: string
  createdAt: string
  updatedAt: string
  content: string
  conversationId: string
  senderId: string
  recievedAt?: string
  readAt?: string
}

export type MessagesApi = MessageApi[]

export interface ConversationApi {
  id: string
  name?: string
  messages: MessagesApi
  participants: UserInfoApi[]
  isGroup: boolean
}

export type ConversationsListApi = ConversationApi[]
