import './App.css'
import { ConversationList } from './components/ConversationsList'
import { Menu } from './components/Menu'
import { MessagesList } from './components/MessagesList'
import { useComponentsDisplayStore } from './store/componentsStore'

function App() {

  const conversationListDisplay = useComponentsDisplayStore((state) => state.conversationListDisplay)
  const messagesListDisplay = useComponentsDisplayStore((state) => state.messagesListDisplay)

  return (
    <div className='md:grid md:grid-cols-14 md:h-screen'>
      <div className='hidden md:block md:col-span-1'>
        <Menu />
      </div>
      <div className='md:hidden'>
        {conversationListDisplay ? (<ConversationList />) : messagesListDisplay ? (<MessagesList />) : null}
      </div>
      <div className='hidden md:block md:col-span-5'>
        <ConversationList />
      </div>
      <div className='hidden md:col-span-8 md:block'>
        <MessagesList />
      </div>
    </div>
  )
}

export default App
