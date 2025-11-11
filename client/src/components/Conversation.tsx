import { useComponentsDisplayStore } from "../store/componentsStore";

type ConversationProps = {
  title: string;
  lastMessage: string;
  time?: string;
  imageUrl?: string;
};

export const Conversation = ({
  title,
  lastMessage,
  time,
  imageUrl = "/images/profile.svg",
}: ConversationProps) => {

  const setMessagesListDisplay = useComponentsDisplayStore((state) => state.setMessagesListDisplay)

  return (
    <div className="rounded-md flex justify-start items-center p-2 hover:bg-gray-800 cursor-pointer transition-all" onClick={() => setMessagesListDisplay(true)}>
      <div className="flex items-center">
        <img
          className="rounded-full border-2 border-gray-900"
          src={imageUrl}
          width={50}
          height={50}
          alt={title}
        />
      </div>

      <div className="p-2 flex flex-col justify-center flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">{title}</p>
          {time && <p className="text-sm text-gray-400 shrink-0">{time}</p>}
        </div>
        <p className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

