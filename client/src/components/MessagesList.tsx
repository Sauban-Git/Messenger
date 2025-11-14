import { useEffect, useRef, type KeyboardEvent } from "react"
import { useComponentsDisplayStore } from "../store/componentsStore"
import { Message } from "./Message"
import { formatToLocalTime } from "../utils/localtz"
import { useMessageListStore } from "../store/messageListStore"
import { useUserInfoStore } from "../store/userInfoStore"
import axios from "../utils/axios.ts"
import type { MessageApi, MessageListApi } from "../types/types"
import { useSelectConversationStore } from "../store/selectConversationStore.ts"

export const MessagesList = () => {

  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLInputElement>(null)
  const messageList = useMessageListStore((state) => state.messagesList)
  const setMessageList = useMessageListStore((state) => state.setMessagesList)
  const addMessage = useMessageListStore((state) => state.addMessage)

  const userInfo = useUserInfoStore((state) => state.user)
  const setConversationsListDisplay = useComponentsDisplayStore((state) => state.setConversationListDisplay)
  const conversationId = useSelectConversationStore((state) => state.id)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {

    const content = inputRef.current?.value
    if (!content) return
    try {
      const res = await axios.post<{ message: MessageApi }>("/message/", {
        conversationId: conversationId,
        senderId: userInfo?.id,
        content: content
      })
      const message = res.data.message
      if (!message) return;
      addMessage(
        {
          senderId: message.senderId,
          content: message.content,
          createdAt: message.createdAt,
          conversationId: message.conversationId,
        }
      );
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.log("Error while fetching api: ", error)
    }
  }

  const isSender = (id: string | undefined) => {
    const a = (userInfo?.id == id) ? true : false
    return a
  }

  const fetchMessages = async () => {
    try {
      const res = await axios.get<{ messages: MessageListApi }>(`/message/${conversationId}`)
      if (!res.data.messages) return
      setMessageList(res.data.messages)
    } catch (error) {
      console.log("Error fetching messages: ", error)
    }
  }

  useEffect(() => {
    fetchMessages()
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus()
  }, []);

  return (

    <div className="border-l-2 border-gray-600 md:h-screen">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex" onClick={() => setConversationsListDisplay(true)}>
          <img src="/images/back.svg" width={50} height={50} />
          <img className="rounded-full py-2 flex items-center" src="/images/profile.svg" width={30} height={30} />
        </div>
        <div className="flex items-center">
          <div className="font-bold text-2xl ">Sauban</div>
        </div>
        <div>
          <img src="/images/options.svg" width={50} height={50} />
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 overflow-y-auto h-[85vh] md:h-[80vh]">
        {messageList ? <div>
          {messageList.length > 0 ? messageList.map((msg, index) => (
            <Message
              key={index}
              sender={isSender(msg.id)}
              status="sent"
              time={formatToLocalTime(msg.createdAt)}
              content={msg.content}
            />
          )) : null}
        </div> : null}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message */}
      <div className="bg-gray-400 py-2 px-3 flex">
        <input className="rounded-xl w-full bg-amber-50 py-3 px-2 text-xl" placeholder="Type here" ref={inputRef} onKeyDown={handleKeyDown} />
        <div className="flex items-center px-2">
          <p className="border rounded-xl p-3 bg-blue-500" onClick={sendMessage}>
            Send
          </p>
        </div>
      </div>
    </div>
  )
}
