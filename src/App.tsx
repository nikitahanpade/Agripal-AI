
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import InputForm from './pages/InputForm';
import Recommendation from './pages/Recommendation';
import { UserProvider } from './context/UserContext';
import InformationPage from './information/InformationPage';
import FarmingCalculator from './pages/FarmingCalculator';
import CropDiseaseChecker from './pages/CropDiseaseChecker';

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
            <Route path="/information/:topic" element={<InformationPage />} />
            <Route path="/farming-calculator" element={<FarmingCalculator />} />
            <Route path="/crop-disease-checker" element={<CropDiseaseChecker />} />

            <Route path="/information/*" element={
              <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-gray-800">
                  Farmer Information Hub
                </h1>
                <p className="text-gray-600 mt-2">
                  Select a farming guide from the homepage to explore useful information.
                </p>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
