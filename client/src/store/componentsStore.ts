import { create } from "zustand"

interface ComponentsDisplayStore {
  messagesListDisplay: boolean
  conversationListDisplay: boolean
  setMessagesListDisplay: (value: boolean) => void
  setConversationListDisplay: (value: boolean) => void
}

export const useComponentsDisplayStore = create<ComponentsDisplayStore>((set) => ({
  messagesListDisplay: false,
  conversationListDisplay: true,
  setMessagesListDisplay: (value: boolean) => set({
    messagesListDisplay: value,
    conversationListDisplay: !value
  }),
  setConversationListDisplay: (value: boolean) => set({
    messagesListDisplay: !value,
    conversationListDisplay: value
  })
}))
