import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, TrendingUp, Shield, Globe, Smartphone, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Intelligent Farming
          <br />
          <span className="text-green-600">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Get AI-powered crop recommendations based on your soil, weather, and market conditions. 
          Maximize your yield and profit with data-driven agricultural insights.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <Brain className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Recommendations</h3>
          <p className="text-gray-600">
            Advanced machine learning algorithms analyze your farm conditions to recommend the most suitable crops for maximum profitability.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Intelligence</h3>
          <p className="text-gray-600">
            Real-time market prices and demand forecasting help you make informed decisions about what to grow and when to sell.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Alerts</h3>
          <p className="text-gray-600">
            Receive timely alerts about weather changes, pest risks, disease outbreaks, and available government subsidies.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How AgriPal AI Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
              1
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Enter Farm Details</h4>
            <p className="text-gray-600 text-sm">Provide your location, soil type, water availability, and budget</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
              2
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
            <p className="text-gray-600 text-sm">Our AI processes weather data, market trends, and agricultural patterns</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
              3
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Get Recommendations</h4>
            <p className="text-gray-600 text-sm">Receive personalized crop suggestions with profit projections</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
              4
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Farm Smarter</h4>
            <p className="text-gray-600 text-sm">Implement AI insights to maximize yield and profitability</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <div className="text-3xl font-bold mb-1">10,000+</div>
          <div className="text-green-100">Farmers Helped</div>
        </div>
        
        <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-8 rounded-2xl">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <div className="text-3xl font-bold mb-1">25%</div>
          <div className="text-blue-100">Average Yield Increase</div>
        </div>
        
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl">
          <Globe className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <div className="text-3xl font-bold mb-1">15</div>
          <div className="text-orange-100">States Covered</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl p-8 md:p-12 text-center">
        <Smartphone className="h-16 w-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
        <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
          Join thousands of farmers who have increased their profits with AI-powered agricultural insights.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Start Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;