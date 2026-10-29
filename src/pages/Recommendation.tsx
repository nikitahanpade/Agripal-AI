import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, TrendingUp, AlertTriangle, Gift, Cloud, ArrowLeft, RefreshCw, Star, DollarSign, Calendar, Target } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AIRecommendation {
  recommendedCrop: string;
  confidence: number;
  expectedProfit: string;
  profitPerAcre: string;
  season: string;
  weather: string;
  alerts: string[];
  subsidies: string[];
  marketTrend: string;
  pestRisk: string;
  tips: string[];
}

const Recommendation: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const { user, formData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !formData) {
      navigate('/register');
      return;
    }

    // Simulate AI processing
    const timer = setTimeout(() => {
      const mockRecommendation = generateMockRecommendation(formData);
      setRecommendation(mockRecommendation);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, formData, navigate]);

  const generateMockRecommendation = (data: any): AIRecommendation => {
    // Mock AI logic based on input
    const cropRecommendations: Record<string, any> = {
      'Black Soil (Regur)': {
        crop: 'Cotton',
        profit: '₹45,000 - ₹65,000',
        perAcre: '₹55,000',
        tips: ['Use drip irrigation for water efficiency', 'Monitor for bollworm pests', 'Apply fertilizer in split doses']
      },
      'Red Soil': {
        crop: 'Groundnut',
        profit: '₹35,000 - ₹55,000',
        perAcre: '₹45,000',
        tips: ['Ensure proper drainage', 'Use calcium-rich fertilizers', 'Harvest at optimal maturity']
      },
      'Alluvial Soil': {
        crop: 'Wheat',
        profit: '₹25,000 - ₹40,000',
        perAcre: '₹32,000',
        tips: ['Timely sowing is crucial', 'Use certified seeds', 'Apply nitrogen in 2-3 splits']
      }
    };

    const selected = cropRecommendations[data.soilType] || cropRecommendations['Black Soil (Regur)'];

    return {
      recommendedCrop: selected.crop,
      confidence: Math.floor(Math.random() * 15) + 85,
      expectedProfit: selected.profit,
      profitPerAcre: selected.perAcre,
      season: 'Kharif 2024',
      weather: 'Moderate rainfall expected in next 7 days',
      alerts: [
        data.waterAvailability === 'Low' ? 'Water stress alert - Consider drought-resistant varieties' : 'Optimal water conditions',
        'Pest alert: Monitor for aphids in current season'
      ],
      subsidies: [
        'PM-KISAN Scheme - ₹6,000 per year',
        'Seed Subsidy - 50% off certified seeds',
        'Drip Irrigation Subsidy - 75% support available'
      ],
      marketTrend: 'Rising demand with 12% price increase expected',
      pestRisk: 'Medium risk - Preventive measures recommended',
      tips: selected.tips
    };
  };

  if (!user || !formData) return null;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Farm Data</h2>
          <p className="text-gray-600 mb-4">Our AI is processing weather patterns, market trends, and soil conditions...</p>
          <div className="bg-gray-100 rounded-full h-2 mb-4">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (!recommendation) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Recommendations for {user.name}'s Farm
        </h1>
        <p className="text-gray-600">
          Based on your farm conditions in {formData.location}
        </p>
      </div>

      {/* Main Recommendation Card */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl p-8 md:p-12 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sprout className="h-12 w-12 mr-4" />
            <div>
              <h2 className="text-3xl font-bold">{recommendation.recommendedCrop}</h2>
              <p className="text-green-100">Recommended Crop</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 mr-1" />
              <span className="text-2xl font-bold">{recommendation.confidence}%</span>
            </div>
            <p className="text-green-100">Confidence</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-2xl p-6">
            <DollarSign className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Expected Profit</h3>
            <p className="text-2xl font-bold">{recommendation.profitPerAcre}</p>
            <p className="text-green-100 text-sm">per acre</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <Calendar className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Growing Season</h3>
            <p className="text-xl font-bold">{recommendation.season}</p>
            <p className="text-green-100 text-sm">Optimal timing</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <Target className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Market Outlook</h3>
            <p className="text-lg font-semibold">{recommendation.marketTrend}</p>
            <p className="text-green-100 text-sm">Price forecast</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Weather & Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Cloud className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Weather & Alerts</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="font-medium text-blue-900">Weather Forecast</p>
              <p className="text-blue-700">{recommendation.weather}</p>
            </div>

            <div>
              <p className="font-medium text-gray-900 mb-2">Active Alerts:</p>
              {recommendation.alerts.map((alert, index) => (
                <div key={index} className="flex items-start bg-orange-50 p-3 rounded-xl mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-orange-800 text-sm">{alert}</p>
                </div>
              ))}
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <p className="font-medium text-red-900">Pest Risk Level</p>
              <p className="text-red-700">{recommendation.pestRisk}</p>
            </div>
          </div>
        </div>

        {/* Subsidies & Support */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Gift className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Available Subsidies</h3>
          </div>
          
          <div className="space-y-3">
            {recommendation.subsidies.map((subsidy, index) => (
              <div key={index} className="bg-purple-50 p-4 rounded-xl">
                <p className="font-medium text-purple-900">{subsidy.split(' - ')[0]}</p>
                <p className="text-purple-700 text-sm">{subsidy.split(' - ')[1]}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-xl">
            <p className="font-medium text-green-900">Total Potential Savings</p>
            <p className="text-green-700 text-lg font-bold">₹8,000 - ₹15,000</p>
          </div>
        </div>
      </div>

      {/* Farming Tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Smart Farming Tips</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {recommendation.tips.map((tip, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-xl">
              <p className="text-green-800 font-medium">Tip #{index + 1}</p>
              <p className="text-green-700 text-sm mt-1">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/input')}
          className="flex items-center justify-center px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Modify Input
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Get New Recommendation
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="flex-1 flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default Recommendation;