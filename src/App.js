import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login'
import Home from './components/Home'
// Replace your code here
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  </BrowserRouter>
)
export default App
