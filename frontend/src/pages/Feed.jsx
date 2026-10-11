import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchFeeds = () => api.get('/feed').then((r) => setFeeds(r.data));
  useEffect(() => { fetchFeeds(); }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/feed', { ...data, quantity: Number(data.quantity), minThreshold: Number(data.minThreshold) });
      toast.success('Feed record added!');
      reset(); setShowForm(false); fetchFeeds();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    await api.delete(`/feed/${id}`);
    toast.success('Deleted'); fetchFeeds();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Feed Inventory</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          + Add Feed
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-2 gap-4">
          <input {...register('feedType')} placeholder="Feed Type *" required className="border rounded-lg px-3 py-2" />
          <input {...register('unit')} placeholder="Unit (kg, L...)" defaultValue="kg" className="border rounded-lg px-3 py-2" />
          <input {...register('quantity')} type="number" placeholder="Quantity *" required className="border rounded-lg px-3 py-2" />
          <input {...register('minThreshold')} type="number" placeholder="Min Threshold" defaultValue={50} className="border rounded-lg px-3 py-2" />
          <button type="submit" className="col-span-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {feeds.map((f) => (
          <div key={f.id} className={`bg-white rounded-2xl shadow p-5 border-l-4 ${f.quantity <= f.minThreshold ? 'border-red-500' : 'border-green-500'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{f.feedType}</h3>
                <p className="text-2xl font-bold mt-1">{f.quantity} <span className="text-sm font-normal text-gray-500">{f.unit}</span></p>
                <p className="text-xs text-gray-400 mt-1">Min: {f.minThreshold} {f.unit}</p>
              </div>
              {f.quantity <= f.minThreshold && (
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Low Stock</span>
              )}
            </div>
            <button onClick={() => handleDelete(f.id)} className="mt-3 text-xs text-red-500 hover:text-red-700">Delete</button>
          </div>
        ))}
        {feeds.length === 0 && <p className="text-gray-400 col-span-3 text-center py-8">No feed records yet</p>}
      </div>
    </div>
  );
}
