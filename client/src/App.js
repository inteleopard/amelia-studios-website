import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import components
import Homepage from '../src/pages/Homepage'


const App = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
