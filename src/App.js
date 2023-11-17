import './App.css'
import AmazonPage from './components/AmazonPage/AmazonPage'
import NavBar from './components/NavBar/NavBar'
import TemplatePage from './components/TemplatePage/TemplatePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<AmazonPage />} />
            <Route path="/nav1" element={<TemplatePage />} />
            <Route path="/nav2" element={<TemplatePage />} />
            <Route path="/nav3" element={<TemplatePage />} />
            <Route path="/nav4" element={<TemplatePage />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  )
}

export default App
