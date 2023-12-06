import './App.css'
import AmazonPage from './components/AmazonPage/AmazonPage'
import CatPage from './components/CatPage/CatPage'
import NavBar from './components/NavBar/NavBar'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<AmazonPage />} />
            <Route path="/cat" element={<CatPage />} />
          </Routes>
        </header>
      </HashRouter>
    </div>
  )
}

export default App
