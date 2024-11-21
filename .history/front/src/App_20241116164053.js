import logo from './logo.svg';
import './App.css';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import UserHome from './pages/HomePages/userhome';
import ProfilePage from "./pages/auth/profile";

import {Route,Routes,BrowserRouter as Router,Navigate} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<profile/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/userhome" element={<UserHome/>}></Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
