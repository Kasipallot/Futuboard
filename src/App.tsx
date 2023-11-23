import './App.css'
import Board from './components/Board.tsx'
import  {BrowserRouter as Router, 
Routes, Route}from 'react-router-dom'
import Home from './components/Home.tsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board/:id" element={<Board/>} />
      </Routes>
    </Router>
  )
}

export default App
