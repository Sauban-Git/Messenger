
import { Conversation } from "./Conversation";

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

  return (
    <div className="md:border-l-2 border-gray-600">
      {/* Header */}
      <div className="flex justify-between p-2 px-2">
        <div className="flex items-center px-4">
          <div className="font-bold text-2xl">Sauban</div>
        </div>
        <div>
          <img src="/images/options.svg" width={30} height={50} />
        </div>
      </div>

      {/* Conversation List */}
      <div className="px-2 overflow-y-auto h-[90vh]">
        {conversationList.map((conv, index) => (
          <Conversation
            key={index}
            title={conv.title}
            lastMessage={conv.lastMessage}
            time={conv.time}
            imageUrl={conv.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

