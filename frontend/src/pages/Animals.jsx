import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchAnimals = () => api.get('/animals').then((r) => setAnimals(r.data));
  useEffect(() => { fetchAnimals(); }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/animals', data);
      toast.success('Animal added!');
      reset(); setShowForm(false); fetchAnimals();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this animal?')) return;
    await api.delete(`/animals/${id}`);
    toast.success('Deleted'); fetchAnimals();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Animals</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          + Add Animal
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-2 gap-4">
          <input {...register('tagNumber')} placeholder="Tag Number *" required className="border rounded-lg px-3 py-2" />
          <input {...register('name')} placeholder="Name" className="border rounded-lg px-3 py-2" />
          <input {...register('species')} placeholder="Species *" required className="border rounded-lg px-3 py-2" />
          <input {...register('breed')} placeholder="Breed" className="border rounded-lg px-3 py-2" />
          <select {...register('gender')} required className="border rounded-lg px-3 py-2">
            <option value="">Gender *</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input {...register('dob')} type="date" className="border rounded-lg px-3 py-2" />
          <button type="submit" className="col-span-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>{['Tag', 'Name', 'Species', 'Breed', 'Gender', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {animals.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{a.tagNumber}</td>
                <td className="px-4 py-3">{a.name || '—'}</td>
                <td className="px-4 py-3">{a.species}</td>
                <td className="px-4 py-3">{a.breed || '—'}</td>
                <td className="px-4 py-3 capitalize">{a.gender}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    a.status === 'healthy' ? 'bg-green-100 text-green-700' :
                    a.status === 'sick' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                </td>
              </tr>
            ))}
            {animals.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No animals registered yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
