import React from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';

const App = () => {
    return (
        <h1 className="text-3xl font-bold">
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
          </Routes>
    </h1>
    )
}

export default App
