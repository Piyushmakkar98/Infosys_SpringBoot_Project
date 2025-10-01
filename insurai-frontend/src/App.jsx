// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    
    <Router>
      <nav className="p-4 bg-gray-100 shadow flex space-x-4">
        <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Signup</Link>
        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h2 className="text-2xl font-bold text-center mt-10">Welcome to <span className="text-blue-600">InsurAi 🚀</span></h2>} />
      </Routes>
    </Router>
  );
}

export default App;
