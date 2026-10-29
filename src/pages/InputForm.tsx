import stateDistrictData from '../data/states-and-districts.json';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Mountain, Droplets, DollarSign, Thermometer,
  FlaskRound as Flask, CloudRain, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    waterAvailability: '',
    budget: '',
    temperature: '',
    ph: '',
    humidity: ''
  });

  const [selectedState, setSelectedState] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user, setFormData: setUserFormData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user, navigate]);

  const soilTypes = [
  'Alluvial Soil',
  'Black Soil (Regur)',
  'Red & Yellow Soil',
  'Laterite Soil',
  'Arid/Desert Soil',
  'Forest/Mountain Soil',
  'Peaty/Marshy Soil',
  'Saline/Alkaline Soil'
];


  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.soilType) newErrors.soilType = 'Soil type is required';
    if (!formData.waterAvailability) newErrors.waterAvailability = 'Water availability is required';
    if (!formData.budget) newErrors.budget = 'Budget range is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setUserFormData({
        location: formData.location,
        soilType: formData.soilType,
        waterAvailability: formData.waterAvailability,
        budget: formData.budget,
        temperature: formData.temperature ? Number(formData.temperature) : undefined,
        ph: formData.ph ? Number(formData.ph) : undefined,
        humidity: formData.humidity ? Number(formData.humidity) : undefined
      });
      navigate('/recommendation');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const districts = stateDistrictData.states.find(
    (s: any) => s.state === selectedState
  )?.districts || [];

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tell us about your farm, {user.name}
          </h1>
          <p className="text-gray-600">
            Provide details about your farming conditions so our AI can give you the best crop recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                State *
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  handleInputChange('location', '');
                }}
                className={`block w-full px-4 py-4 border rounded-xl ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select State</option>
                {stateDistrictData.states.map((stateObj) => (
                  <option key={stateObj.state} value={stateObj.state}>
                    {stateObj.state}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                District *
              </label>
              <select
                value={formData.location.split(' - ')[1] || ''}
                onChange={(e) =>
                  handleInputChange('location', `${selectedState} - ${e.target.value}`)
                }
                disabled={!selectedState}
                className={`block w-full px-4 py-4 border rounded-xl ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select District</option>
                {districts.map((district: string) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mountain className="inline h-4 w-4 mr-1" />
                Soil Type *
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => handleInputChange('soilType', e.target.value)}
                className={`block w-full px-4 py-4 border rounded-xl ${
                  errors.soilType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select soil type</option>
                {soilTypes.map((soil) => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
              {errors.soilType && (
                <p className="mt-2 text-sm text-red-600">{errors.soilType}</p>
              )}
            </div>

            {/* Water Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Droplets className="inline h-4 w-4 mr-1" />
                Water Availability *
              </label>
              <select
                value={formData.waterAvailability}
                onChange={(e) => handleInputChange('waterAvailability', e.target.value)}
                className={`block w-full px-4 py-4 border rounded-xl ${
                  errors.waterAvailability ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select water availability</option>
                <option value="Low">Low - Limited irrigation/rainfall</option>
                <option value="Medium">Medium - Moderate irrigation/rainfall</option>
                <option value="High">High - Abundant water supply</option>
              </select>
              {errors.waterAvailability && (
                <p className="mt-2 text-sm text-red-600">{errors.waterAvailability}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Budget Range *
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className={`block w-full px-4 py-4 border rounded-xl ${
                  errors.budget ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select budget range</option>
                <option value="Low">Low - ₹1000- ₹5,000 per acre</option>
                <option value="Medium">Medium - ₹50,000 - ₹1,00,000 per acre</option>
                <option value="High">High - Above ₹1,00,000 per acre</option>
              </select>
              {errors.budget && (
                <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
              )}
            </div>
          </div>

          {/* Optional Fields */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Optional Details (for better recommendations)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Temperature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="inline h-4 w-4 mr-1" />
                  Avg. Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-xl"
                  placeholder="e.g., 28"
                />
              </div>

              {/* pH Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flask className="inline h-4 w-4 mr-1" />
                  Soil pH
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-xl"
                  placeholder="e.g., 6.5"
                />
              </div>

              {/* Humidity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CloudRain className="inline h-4 w-4 mr-1" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-xl"
                  placeholder="e.g., 65"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="flex items-center justify-center px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700"
            >
              Get AI Recommendations
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;