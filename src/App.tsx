import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import InputForm from './pages/InputForm';
import Recommendation from './pages/Recommendation';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/recommendation" element={<Recommendation />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;