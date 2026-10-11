import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/axios';

const StatCard = ({ label, value, color }) => (
  <div className={`bg-white rounded-2xl shadow p-6 border-l-4 ${color}`}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

export default function Dashboard() {
  const [animals, setAnimals] = useState([]);
  const [sales, setSales] = useState({ totalSales: 0, totalRevenue: 0 });
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    api.get('/animals').then((r) => setAnimals(r.data));
    api.get('/sales/summary').then((r) => setSales(r.data));
    api.get('/feed').then((r) => setFeeds(r.data));
  }, []);

  const speciesData = animals.reduce((acc, a) => {
    const found = acc.find((x) => x.species === a.species);
    found ? found.count++ : acc.push({ species: a.species, count: 1 });
    return acc;
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Animals" value={animals.length} color="border-green-500" />
        <StatCard label="Total Sales" value={sales.totalSales} color="border-blue-500" />
        <StatCard label="Revenue (RWF)" value={sales.totalRevenue.toLocaleString()} color="border-yellow-500" />
        <StatCard label="Feed Types" value={feeds.length} color="border-purple-500" />
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Animals by Species</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={speciesData}>
            <XAxis dataKey="species" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
