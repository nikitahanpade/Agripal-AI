
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Search, CalendarDays, Sprout, FlaskConical,
  Droplets, Bug, TrendingUp, Landmark, Tractor, Calculator, Camera
} from 'lucide-react';

const informationCards = [
  {
    title: 'Crop Calendar',
    description: 'Explore seasonal crops and learn the best time for sowing and harvesting.',
    icon: CalendarDays,
    color: 'bg-green-100 text-green-700',
    path: '/information/crop-calendar',
  },
  {
    title: 'Soil Health Guide',
    description: 'Understand soil types, soil testing, pH levels and soil improvement.',
    icon: FlaskConical,
    color: 'bg-amber-100 text-amber-700',
    path: '/information/soil-health',
  },
  {
    title: 'Fertilizer Guide',
    description: 'Learn about fertilizers, nutrients and their proper application.',
    icon: Sprout,
    color: 'bg-emerald-100 text-emerald-700',
    path: '/information/fertilizer-guide',
  },
  {
    title: 'Irrigation Guide',
    description: 'Discover water-saving techniques and irrigation methods.',
    icon: Droplets,
    color: 'bg-blue-100 text-blue-700',
    path: '/information/irrigation',
  },
  {
    title: 'Pest & Disease Guide',
    description: 'Identify common crop problems and learn prevention methods.',
    icon: Bug,
    color: 'bg-red-100 text-red-700',
    path: '/information/pest-disease',
  },
  {
    title: 'Market Information',
    description: 'Learn about agricultural markets, selling and crop prices.',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-700',
    path: '/information/market',
  },
  {
    title: 'Government Schemes',
    description: 'Explore farmer welfare schemes, eligibility and application guidance.',
    icon: Landmark,
    color: 'bg-orange-100 text-orange-700',
    path: '/information/government-schemes',
  },
  {
    title: 'Modern Farming Tips',
    description: 'Discover modern agricultural technology, tools and farming practices.',
    icon: Tractor,
    color: 'bg-cyan-100 text-cyan-700',
    path: '/information/modern-farming',
  },
];

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredCards = informationCards.filter((card) =>
    `${card.title} ${card.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero Section */}
      <section className="text-center py-14 md:py-20">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Sprout size={18} />
          Smart Agriculture Advisor
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Grow Smarter with
          <span className="block text-green-600 mt-2">AgriPal AI</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover useful farming knowledge, improve crop production,
          manage resources and make better agricultural decisions.
        </p>

        <Link
          to="/input"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg"
        >
          Get Crop Recommendations
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Farming Calculator Feature */}
      <section className="bg-gradient-to-r from-emerald-700 to-green-600 rounded-3xl p-8 md:p-10 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full text-sm font-semibold mb-4">
              <Calculator size={18} />
              Smart Farming Tool
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Farming Cost & Profit Calculator
            </h2>

            <p className="text-green-50 leading-7">
              Calculate your farming expenses, expected income and estimated
              profit. Make better financial decisions for your farm.
            </p>
          </div>

          <Link
            to="/farming-calculator"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-green-700 px-7 py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-lg"
          >
            Calculate Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Crop Disease Checker Feature */}
      <section className="bg-gradient-to-r from-teal-700 to-emerald-600 rounded-3xl p-8 md:p-10 text-white mb-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full text-sm font-semibold mb-4">
              <Camera size={18} />
              Crop Health Tool
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Crop Disease Checker
            </h2>

            <p className="text-teal-50 leading-7">
              Upload a crop image, select the crop and describe visible
              symptoms to get basic crop health guidance and preventive tips.
            </p>
          </div>

          <Link
            to="/crop-disease-checker"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-teal-700 px-7 py-4 rounded-xl font-bold hover:bg-teal-50 transition shadow-lg"
          >
            Check Crop Health
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Information Hub */}
      <section id="farmer-hub" className="py-10">
        <div className="text-center mb-10">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Farmer Knowledge Center
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Explore Farming Information
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find practical information and helpful guides for every stage
            of farming.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={21} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search farming information..."
            className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Information Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${card.color}`}>
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600">
                  {card.title}
                </h3>

                <p className="text-sm text-gray-600 leading-6 mb-5">
                  {card.description}
                </p>

                <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                  Explore Guide
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No information found. Try another search.
          </p>
        )}
      </section>

      {/* Crop Recommendation Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-center text-white my-14">
        <h2 className="text-3xl font-bold mb-4">
          Get the Right Crop for Your Farm
        </h2>
        <p className="text-green-100 max-w-2xl mx-auto mb-8">
          Enter your farm details and explore crop recommendations
          based on your agricultural conditions.
        </p>
        <Link
          to="/input"
          className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition"
        >
          Start Crop Analysis
          <ArrowRight size={20} />
        </Link>
      </section>

    </main>
  );
};

export default HomePage;
