import React, { useEffect, useState } from "react";
import { apiUrl } from '../api';

const Dataset = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
  fetch(apiUrl('/form-submissions'))
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data:", data); // 
      setEntries(data);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);


  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Form Dataset Table</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">District</th>
              <th className="px-4 py-2 text-left">Soil Type</th>
              <th className="px-4 py-2 text-left">Water</th>
              <th className="px-4 py-2 text-left">Budget</th>
              <th className="px-4 py-2 text-left">Temp (°C)</th>
              <th className="px-4 py-2 text-left">Soil pH</th>
              <th className="px-4 py-2 text-left">Humidity (%)</th>
              <th className="px-4 py-2 text-left">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  No data submitted yet.
                </td>
              </tr>
            ) : (
              entries.map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.state}</td>
                  <td className="px-4 py-2">{item.district}</td>
                  <td className="px-4 py-2">{item.soilType}</td>
                  <td className="px-4 py-2">{item.waterAvailability}</td>
                  <td className="px-4 py-2">{item.budgetRange}</td>
                  <td className="px-4 py-2">{item.temperature}</td>
                  <td className="px-4 py-2">{item.soilPh}</td>
                  <td className="px-4 py-2">{item.humidity}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dataset;
