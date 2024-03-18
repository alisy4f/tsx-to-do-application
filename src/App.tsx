import './App.css'
import Todo from './components/Todo'
import { Slide, ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Todo />
      <ToastContainer
        theme="colored"
        hideProgressBar={true}
        autoClose={3000}
        draggable={false}
        transition={Slide}
      />
    </>
  )
}

export default App
