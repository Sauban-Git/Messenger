
import { useRef, useState } from "react";
import { Conversation } from "./Conversation";
import { Options } from "./Options";

export const ConversationList = () => {
  const conversationList = [
    {
      title: "John Doe",
      lastMessage: "Hey, are we still meeting tomorrow?",
      time: "10:15 AM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Alice Johnson",
      lastMessage: "I’ve sent you the updated design mockups.",
      time: "9:48 AM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Project Team",
      lastMessage: "Let’s deploy the latest build today.",
      time: "Yesterday",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Mom",
      lastMessage: "Beta, don’t forget to eat breakfast 😊",
      time: "8:05 AM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Ravi Kumar",
      lastMessage: "Bro, that code finally worked!",
      time: "Yesterday",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Emily",
      lastMessage: "Good night 🌙",
      time: "11:57 PM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Work Chat",
      lastMessage: "The meeting link has been updated.",
      time: "Yesterday",
      imageUrl: "/images/profile.svg",
    }, {
      title: "Alice Johnson",
      lastMessage: "I’ve sent you the updated design mockups.",
      time: "9:48 AM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Project Team",
      lastMessage: "Let’s deploy the latest build today.",
      time: "Yesterday",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Mom",
      lastMessage: "Beta, don’t forget to eat breakfast 😊",
      time: "8:05 AM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Ravi Kumar",
      lastMessage: "Bro, that code finally worked!",
      time: "Yesterday",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Emily",
      lastMessage: "Good night 🌙",
      time: "11:57 PM",
      imageUrl: "/images/profile.svg",
    },
    {
      title: "Work Chat",
      lastMessage: "The meeting link has been updated.",
      time: "Yesterday",
      imageUrl: "/images/profile.svg",
    },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen((prev) => !prev);
  const closePopup = () => setIsPopupOpen(false);

  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversationList.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchRef = useRef<HTMLInputElement>(null)


  return (
    <div className="md:border-l-2 border-gray-600 md:h-screen">
      {/* Header */}
      <div className="flex justify-between p-2 px-2">
        <div className="flex items-center px-4">
          <div className="font-bold text-2xl">Messenger</div>
        </div>
        <div className="relative">
          <img src="/images/options.svg" width={30} height={50} onClick={togglePopup} />
          <Options isOpen={isPopupOpen} onClose={closePopup} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ref={searchRef} className="rounded-xl w-full border border-gray-600 text-xl p-2" placeholder="Search" type="text" />
      </div>

      {/* Conversation List */}
      <div className="px-2 overflow-y-auto h-[80vh] md:h-[78vh]">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv, index) => (
            <Conversation
              key={index}
              title={conv.title}
              lastMessage={conv.lastMessage}
              time={conv.time}
              imageUrl={conv.imageUrl}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">No results found</div>
        )}
      </div>

    </div>
  );
};

