
import React, { useState } from 'react';
import {
  Calculator, Sprout, IndianRupee, TrendingUp,
  Wallet, RotateCcw, Info
} from 'lucide-react';

const FarmingCalculator: React.FC = () => {
  const [crop, setCrop] = useState('Sugarcane');
  const [area, setArea] = useState('1');
  const [seedCost, setSeedCost] = useState('3000');
  const [fertilizerCost, setFertilizerCost] = useState('5000');
  const [pesticideCost, setPesticideCost] = useState('2000');
  const [labourCost, setLabourCost] = useState('6000');
  const [irrigationCost, setIrrigationCost] = useState('2500');
  const [otherCost, setOtherCost] = useState('1500');
  const [yieldAmount, setYieldAmount] = useState('40');
  const [sellingPrice, setSellingPrice] = useState('3500');

  const number = (value: string) => Math.max(0, Number(value) || 0);

  const totalCost =
    number(seedCost) +
    number(fertilizerCost) +
    number(pesticideCost) +
    number(labourCost) +
    number(irrigationCost) +
    number(otherCost);

  const revenue = number(yieldAmount) * number(sellingPrice);
  const profit = revenue - totalCost;
  const profitPerAcre = number(area) > 0 ? profit / number(area) : 0;

  const formatMoney = (value: number) =>
    `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const resetCalculator = () => {
    setCrop('Sugarcane');
    setArea('1');
    setSeedCost('3000');
    setFertilizerCost('5000');
    setPesticideCost('2000');
    setLabourCost('6000');
    setIrrigationCost('2500');
    setOtherCost('1500');
    setYieldAmount('40');
    setSellingPrice('3500');
  };

  const inputClass =
    'w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100';

  const costFields = [
    { label: 'Seeds & Planting Material', value: seedCost, setter: setSeedCost },
    { label: 'Fertilizers & Manure', value: fertilizerCost, setter: setFertilizerCost },
    { label: 'Pesticides & Medicines', value: pesticideCost, setter: setPesticideCost },
    { label: 'Labour Charges', value: labourCost, setter: setLabourCost },
    { label: 'Irrigation & Electricity', value: irrigationCost, setter: setIrrigationCost },
    { label: 'Other Expenses', value: otherCost, setter: setOtherCost },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="bg-gradient-to-r from-green-800 to-emerald-600 rounded-3xl p-8 md:p-10 text-white mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Calculator size={30} />
          </div>
          <span className="font-semibold text-green-100">AgriPal AI • Smart Tools</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Farming Cost & Profit Calculator
        </h1>
        <p className="text-green-50 max-w-2xl leading-7">
          Calculate your farming expenses, expected income and estimated profit
          before making important farming decisions.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <Sprout className="text-green-600" /> Farm Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Crop Name
              </label>
              <select className={inputClass} value={crop} onChange={e => setCrop(e.target.value)}>
                {['Sugarcane', 'Rice', 'Soybean', 'Wheat', 'Maize', 'Cotton', 'Groundnut', 'Vegetables', 'Other'].map(item => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Land Area (Acres)
              </label>
              <input type="number" min="0" className={inputClass} value={area} onChange={e => setArea(e.target.value)} />
            </div>
          </div>

          <h3 className="font-bold text-lg text-gray-800 mb-4">Farming Expenses (₹)</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {costFields.map(field => (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                />
              </div>
            ))}
          </div>

          <h3 className="font-bold text-lg text-gray-800 mb-4">Expected Production & Selling Price</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Production (Quintals)
              </label>
              <input type="number" min="0" className={inputClass} value={yieldAmount} onChange={e => setYieldAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Selling Price (₹ per Quintal)
              </label>
              <input type="number" min="0" className={inputClass} value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
            </div>
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            <RotateCcw size={18} /> Reset Values
          </button>
        </section>

        <aside className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <TrendingUp className="text-green-600" /> Estimated Results
            </h2>

            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-blue-700 mb-1">Total Farming Cost</p>
              <p className="text-2xl font-bold text-blue-900">{formatMoney(totalCost)}</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-purple-700 mb-1">Expected Revenue</p>
              <p className="text-2xl font-bold text-purple-900">{formatMoney(revenue)}</p>
            </div>

            <div className={`${profit >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-xl p-4 mb-4`}>
              <p className={`text-sm mb-1 ${profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                Estimated {profit >= 0 ? 'Profit' : 'Loss'}
              </p>
              <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                {formatMoney(Math.abs(profit))}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500 mb-1">Profit / Loss per Acre</p>
              <p className="text-xl font-bold text-gray-900">{formatMoney(profitPerAcre)}</p>
            </div>
          </section>

          <section className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
              <Wallet size={20} /> Financial Summary
            </div>
            <p className="text-sm text-gray-700 leading-6">
              Crop: <strong>{crop}</strong><br />
              Land Area: <strong>{number(area)} Acres</strong><br />
              Production: <strong>{number(yieldAmount)} Quintals</strong>
            </p>
          </section>
        </aside>
      </div>

      <section className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
        <Info className="text-amber-700 shrink-0 mt-1" size={21} />
        <p className="text-sm text-amber-900 leading-6">
          <strong>Important:</strong> These are estimates based only on the values
          entered by you. Actual profit may vary due to weather, crop quality,
          market prices, transport and other expenses. Enter all costs for a
          more realistic estimate.
        </p>
      </section>
    </main>
  );
};

export default FarmingCalculator;
