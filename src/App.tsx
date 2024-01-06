import "./App.css"

import  { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import BoardContainer from "./components/BoardContainer"
import Home from "./components/Home"

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
