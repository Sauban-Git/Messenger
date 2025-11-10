import { Header } from "./Header"
import { Message } from "./Message"

export const Conversation = () => {
  return (
    <div className="border-l-2 border-gray-600 ">
      <div>
        <Header />
      </div>
      <div className="px-5 overflow-y-auto h-[90vh]">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  )
}
