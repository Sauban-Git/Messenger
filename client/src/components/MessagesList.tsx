import { useEffect, useRef, type KeyboardEvent } from "react"
import { useComponentsDisplayStore } from "../store/componentsStore"
import { Message } from "./Message"
import { formatToLocalTime } from "../utils/localtz"
import { useMessageListStore } from "../store/messageListStore"
import { useUserInfoStore } from "../store/userInfoStore"

export const MessagesList = () => {



  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLInputElement>(null)
  const messageList = useMessageListStore((state) => state.messagesList)
  // const setMessageList = useMessageListStore((state) => state.setMessagesList)
  const addMessage = useMessageListStore((state) => state.addMessage)

  const userInfo = useUserInfoStore((state) => state.user)

  // const demoMessages: DemoMessage[] = [
  //   { sender: false, content: "Hey! How’s it going?", time: "10:01 AM", status: "read" },
  //   { sender: true, content: "Hey, I’m good! Just finished my project.", time: "10:02 AM", status: "sent" },
  //   { sender: false, content: "Nice! What project was it?", time: "10:03 AM", status: "delivered" },
  //   { sender: true, content: "A small AI chatbot for my college task 😅", time: "10:04 AM", status: "read" },
  //   { sender: false, content: "Oh cool! Using React or something else?", time: "10:05 AM", status: "read" },
  //   { sender: true, content: "Yeah, React with a Flask backend.", time: "10:06 AM", status: "read" },
  //   { sender: false, content: "Flask? I’ve used that before — easy to set up.", time: "10:07 AM", status: "read" },
  //   { sender: true, content: "Exactly! Just wanted something lightweight.", time: "10:08 AM", status: "delivered" },
  //   { sender: false, content: "Are you deploying it somewhere?", time: "10:09 AM", status: "delivered" },
  //   { sender: true, content: "Not yet. Might try Vercel functions or local testing first.", time: "10:10 AM", status: "sent" },
  //   { sender: false, content: "Sounds like a plan 😄", time: "10:11 AM", status: "read" },
  //   { sender: true, content: "Yeah, once it’s stable I’ll push it live.", time: "10:12 AM", status: "read" },
  //   { sender: false, content: "By the way, did you check that old missionary place nearby?", time: "10:13 AM", status: "read" },
  //   { sender: true, content: "Not yet. Want to go this weekend?", time: "10:14 AM", status: "sent" },
  //   { sender: false, content: "Sure, let’s plan for Saturday morning.", time: "10:15 AM", status: "read" },
  //   { sender: true, content: "Perfect 👍", time: "10:16 AM", status: "delivered" },
  //   { sender: false, content: "Cool. I’ll bring my camera too.", time: "10:17 AM", status: "read" },
  //   { sender: true, content: "Nice! We’ll get some great shots there.", time: "10:18 AM", status: "read" },
  //   { sender: false, content: "Alright, see you then!", time: "10:19 AM", status: "read" },
  //   { sender: true, content: "See ya 👋", time: "10:20 AM", status: "read" },
  // ];

  const setConversationsListDisplay = useComponentsDisplayStore((state) => state.setConversationListDisplay)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevents form submission or line break
      sendMessage();
    }
  };

  const sendMessage = () => {
    const content = inputRef.current?.value?.trim() || "";
    if (!content) return;
    addMessage(
      {
        senderId: userInfo?.id || " ",
        content,
        createdAt: new Date().toISOString(),
        conversationId: "asdkjfasd",

      }
    );
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const isSender = (id: string | undefined) => {
    const a = (userInfo?.id == id) ? true : false
    return a
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus()
  }, [messageList]);

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
