import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Health() {
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchData = () => {
    api.get('/health').then((r) => setRecords(r.data));
    api.get('/animals').then((r) => setAnimals(r.data));
  };
  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/health', data);
      toast.success('Health record added!');
      reset(); setShowForm(false); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Health Records</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          + Add Record
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-2 gap-4">
          <select {...register('animalId')} required className="border rounded-lg px-3 py-2">
            <option value="">Select Animal *</option>
            {animals.map((a) => <option key={a.id} value={a.id}>{a.tagNumber} - {a.name || a.species}</option>)}
          </select>
          <select {...register('recordType')} required className="border rounded-lg px-3 py-2">
            <option value="">Record Type *</option>
            <option value="vaccination">Vaccination</option>
            <option value="treatment">Treatment</option>
            <option value="checkup">Checkup</option>
          </select>
          <input {...register('description')} placeholder="Description *" required className="border rounded-lg px-3 py-2 col-span-2" />
          <input {...register('medication')} placeholder="Medication" className="border rounded-lg px-3 py-2" />
          <input {...register('dosage')} placeholder="Dosage" className="border rounded-lg px-3 py-2" />
          <div className="col-span-2">
            <label className="text-sm text-gray-500">Next Due Date</label>
            <input {...register('nextDueDate')} type="date" className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>
          <button type="submit" className="col-span-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>{['Animal Tag', 'Type', 'Description', 'Medication', 'Next Due', 'Date'].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{r.animalTag}</td>
                <td className="px-4 py-3 capitalize">{r.recordType}</td>
                <td className="px-4 py-3">{r.description}</td>
                <td className="px-4 py-3">{r.medication || '—'}</td>
                <td className="px-4 py-3">{r.nextDueDate ? new Date(r.nextDueDate).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3">{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No health records yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
