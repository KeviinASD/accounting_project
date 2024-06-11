import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home/Home'
import InventarioPeps from './pages/InventarioPeps/InventarioPeps'
import Promedio from './pages/Promedio/Promedio'

function App() {

  return (
    <>

      <nav>
        <ul className='flex gap-4 py-5 px-6 rounded text-white bg-gray-900 m-4'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/inventario-peps">Inventario Peps</Link>
          </li>
          <li>
            <Link to="/inventario-promedio">Inventario Promedio</Link>
          </li>
        </ul>
      </nav> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventario-peps" element={<InventarioPeps/>} />
        <Route path="/inventario-promedio" element={<Promedio/>} />
      </Routes>
    </>
  )
}

export default App
