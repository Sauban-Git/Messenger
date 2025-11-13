import './App.css'
import { ConversationList } from './components/ConversationsList'
import { LoginPage } from './components/Login'
import { Menu } from './components/Menu'
import { MessagesList } from './components/MessagesList'
import { SignupPage } from './components/SignUp'
import { useComponentsDisplayStore } from './store/componentsStore'

function App() {

  const conversationListDisplay = useComponentsDisplayStore((state) => state.conversationListDisplay)
  const messagesListDisplay = useComponentsDisplayStore((state) => state.messagesListDisplay)
  const signupDisplay = useComponentsDisplayStore((state) => state.signupDisplay)
  const loginDisplay = useComponentsDisplayStore((state) => state.loginDisplay)

  return signupDisplay ? (<SignupPage />) : loginDisplay ? (<LoginPage />) : (
    <div className='w-full h-screen overflow-hidden md:grid md:grid-cols-14'>
      <div className='hidden md:block md:col-span-1'>
        <Menu />
      </div>
      <div className='md:hidden'>
        {conversationListDisplay ? (<ConversationList />) : messagesListDisplay ? (<MessagesList />) : signupDisplay ? (<SignupPage />) : loginDisplay ? (<LoginPage />) : null}
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
