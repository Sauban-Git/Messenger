import './App.css'
import { Conversation } from './components/Conversation'
import { Menu } from './components/Menu'

function App() {

  return (
    <>
      <div className='grid grid-cols-6'>
        <div className='col-span-1'>

          <Menu />
        </div>
        <div className='col-span-2'>

          <Conversation />
        </div>
        <div className='col-span-3'>
          <Conversation />
        </div>
      </div>
    </>
  )
}

export default App
