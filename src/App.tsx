import './App.css'

import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import BoardContainer from './components/BoardContainer'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board/:id" element={<BoardContainer/>} />
      </Routes>
    </Router>
  )
}

export default App
