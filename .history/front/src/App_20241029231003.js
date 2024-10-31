import logo from './logo.svg';
import './App.css';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        
      </Routes>
      </Router>
    </div>
  );
}

export default App;
