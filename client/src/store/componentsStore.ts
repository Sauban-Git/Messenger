import { create } from "zustand"

interface ComponentsDisplayStore {
  messagesListDisplay: boolean
  conversationListDisplay: boolean
  signupDisplay: boolean
  loginDisplay: boolean
  setMessagesListDisplay: (value: boolean) => void
  setConversationListDisplay: (value: boolean) => void
  setSignupDisplay: (value: boolean) => void
  setLoginDisplay: (value: boolean) => void
}

export const useComponentsDisplayStore = create<ComponentsDisplayStore>((set) => ({
  messagesListDisplay: false,
  conversationListDisplay: false,
  signupDisplay: true,
  loginDisplay: false,
  setMessagesListDisplay: (value: boolean) => set({
    messagesListDisplay: value,
    conversationListDisplay: !value,
    signupDisplay: !value,
    loginDisplay: !value,
  }),
  setConversationListDisplay: (value: boolean) => set({
    messagesListDisplay: !value,
    conversationListDisplay: value,
    signupDisplay: !value,
    loginDisplay: !value,
  }),
  setLoginDisplay: (value: boolean) => set({
    messagesListDisplay: !value,
    conversationListDisplay: !value,
    signupDisplay: !value,
    loginDisplay: value
  }),
  setSignupDisplay: (value: boolean) => set({
    messagesListDisplay: !value,
    conversationListDisplay: !value,
    signupDisplay: value,
    loginDisplay: !value
  })
}))
