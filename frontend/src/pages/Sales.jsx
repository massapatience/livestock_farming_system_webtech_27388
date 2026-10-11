import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({ totalSales: 0, totalRevenue: 0 });
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchData = () => {
    api.get('/sales').then((r) => setSales(r.data));
    api.get('/sales/summary').then((r) => setSummary(r.data));
    api.get('/animals').then((r) => setAnimals(r.data.filter((a) => a.status !== 'sold')));
  };
  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/sales', { ...data, amount: Number(data.amount) });
      toast.success('Sale recorded!');
      reset(); setShowForm(false); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Sales</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          + Record Sale
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-3xl font-bold">{summary.totalSales}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold">RWF {summary.totalRevenue?.toLocaleString()}</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-2 gap-4">
          <select {...register('animalId')} required className="border rounded-lg px-3 py-2">
            <option value="">Select Animal *</option>
            {animals.map((a) => <option key={a.id} value={a.id}>{a.tagNumber} - {a.species}</option>)}
          </select>
          <input {...register('buyerName')} placeholder="Buyer Name *" required className="border rounded-lg px-3 py-2" />
          <input {...register('amount')} type="number" placeholder="Amount (RWF) *" required className="border rounded-lg px-3 py-2" />
          <input {...register('saleDate')} type="date" required className="border rounded-lg px-3 py-2" />
          <button type="submit" className="col-span-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>{['Animal', 'Buyer', 'Amount (RWF)', 'Date'].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{s.animal?.tagNumber || s.animalId}</td>
                <td className="px-4 py-3">{s.buyerName}</td>
                <td className="px-4 py-3">{Number(s.amount).toLocaleString()}</td>
                <td className="px-4 py-3">{s.saleDate}</td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">No sales recorded yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
