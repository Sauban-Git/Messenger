
import { useEffect, useRef, useState } from "react";
import { Conversation } from "./Conversation";
import { Options } from "./Options";
import { useUserInfoStore } from "../store/userInfoStore";
import axios from "../utils/axios.ts";
import type { ConversationsListApi, UserInfoApi } from "../types/types";
import { useConversationsListStore } from "../store/conversationListStore.ts";
import { useSelectConversationStore } from "../store/selectConversationStore.ts";

export const ConversationList = () => {

  const [users, setUsers] = useState<UserInfoApi[] | null>(null)

  const setConversationsList = useConversationsListStore((state) => state.setConversationsList)
  const conversationList = useConversationsListStore((state) => state.conversationsList)

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen((prev) => !prev);
  const closePopup = () => setIsPopupOpen(false);

  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversationList?.filter(conv =>
    conv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.messages[0]?.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchRef = useRef<HTMLInputElement>(null)
  const userInfo = useUserInfoStore((state) => state.user)

  const fetchConversationList = async () => {
    const response = await axios.get<{ conversation: ConversationsListApi }>("/conversation/")
    setConversationsList(response.data.conversation)

    const res = await axios.get<{ users: UserInfoApi[] }>("/user/")
    setUsers(res.data.users)

  }

  const setSelectConversation = useSelectConversationStore((state) => state.setConversationStore)

  const openMessage = (id: string, name: string | undefined) => {
    if (name) {

      setSelectConversation({
        id: id,
        name: name ?? null
      })
    }
  }

  useEffect(() => {
    fetchConversationList()
  }, [])

  return (
    <div className="md:border-l-2 border-gray-600 md:h-screen">
      {/* Header */}
      <div className="flex justify-between p-2 px-2">
        <div className="flex items-center px-4">
          <div className="font-bold text-2xl">{userInfo?.name}</div>
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
        {filteredConversations ? <div>

          <div className="text-center text-gray-500 mt-4">Chats</div>
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv, index) => (
              <div key={index} onClick={() => openMessage(conv.id, conv.name)}>
                <Conversation
                  title={conv.name || ""}
                  lastMessage={
                    conv.messages[0]?.content ?? ""
                  }
                />
              </div>
            ))
          ) : (
            null
          )}
        </div> : null}
        {users ? <div>

          <div className="text-center text-gray-500 mt-4">Contacts</div>
          {users.length > 0 ? (

            users.map((conv, index) => (
              <Conversation
                key={index}
                title={conv.name || ""}
                lastMessage="Click to start Conversation"
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">No results found</div>
          )}
        </div> : null}


      </div>

    </div>
  );
};

